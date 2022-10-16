const { Router } = require('express');
const router = Router();

const { prisma, upload, DisasterType, PriorityIndex, isInRadius, priorityIndexMap, getAsDateTime, getDistance, getCenter, OrgType } = require('../../lib/utils');

router.get('/', async (req, res) => {
	const {
		disasterType,
		priorityIndex,
		longitude,
		latitude
	} = req.query;

	try {
		const reports = await prisma.report.findMany({
			where: {
				disasterType,
				priorityIndex,
			},
		});

		const reportsInArea = reports.filter((report) => isInRadius({ latitude, longitude }, { latitude: report.latitude, longitude: report.longitude }, 25));

		return res.status(200).send(reportsInArea);
	} catch (e) {
		console.error(e.message);
		res.status(500).send({
			success: false,
			error: 'failed to fetch reports'
		});
	}
});

router.post('/', upload.single('supporting-media'), async (req, res) => {
	// ideally we'll have a schema (joi or something) to resolve
	// issues of bad payloads
	const {
		title,
		longitude,
		latitude,
		priorityIndex,
		disasterType,
		disasterOccurredAt,
		isBoosted,
	} = req.body;

	const username = req.auth?.username;
	const supportingMediaOne = req.file?.path;

	if (typeof username === 'undefined') {
		return res.status(401).send({ success: false, error: 'user not authorized' });
	}

	if (typeof supportingMediaOne === 'undefined') {
		return res.status(500).send({ success: false, error: 'failed to upload supporting media' });
	}

	const disasterTime = getAsDateTime(disasterOccurredAt);

	const lat = parseFloat(latitude);
	const long = parseFloat(longitude);

	let points = 0;

	try {
		const affiliation = await prisma.affiliation.findUnique({
			where: {
				username
			},
			select: {
				orgType: true
			}
		});

		if (typeof affiliation === 'undefined' || !affiliation) {
			points = 0;
		} else {
			points = affiliation.orgType === OrgType['GOVT'] ? 10 : 5;
		}

		const report = await prisma.report.create({
			data: {
				username,
				title,
				latitude: lat,
				longitude: long,
				priorityIndex,
				disasterType,
				disasterOccurredAt: disasterTime.toJSDate(),
				isBoosted: isBoosted.toUpperCase() === 'TRUE',
				isPublic: points >= 10,
				supportingMediaOne
			}
		});

		const disasterTimeFrom = disasterTime.minus({ hours: 1 });
		const disasterTimeTo = disasterTime.plus({ hours: 1 });

		const clusters = await prisma.cluster.findMany({
			where: {
				OR: priorityIndexMap[priorityIndex].map(p => ({ priorityIndex: p })),
				disasterType,
				AND: [
					{
						disasterOccurredAt: {
							gte: disasterTimeFrom.toJSDate(),
						},
					},
					{
						disasterOccurredAt: {
							lte: disasterTimeTo.toJSDate()
						},
					},
				]
			}
		});

		const reportedPoint = { latitude: lat, longitude: long };
		const closestClusters = clusters.filter((c) => {
			return isInRadius(reportedPoint, { latitude: c.latitude, longitude: c.longitude }, 25);
		});

		// console.log(closestClusters);

		let clusterId = null;
		if (typeof closestClusters === 'undefined' || !closestClusters.length) {
			const cluster = await prisma.cluster.create({
				data: {
					latitude: lat,
					longitude: long,
					disasterType,
					priorityIndex,
					disasterOccurredAt: disasterTime.toJSDate(),
					points
				}
			});

			clusterId = cluster.clusterId;
		} else {
			const sortedClusters = closestClusters.sort((a, b) => {
				const bDist = getDistance(reportedPoint, { latitude: b.latitude, longitude: b.longitude });
				const aDist = getDistance(reportedPoint, { latitude: a.latitude, longitude: a.longitude });

				return aDist - bDist;
			});

			const cluster = sortedClusters.shift();

			// get most reported priority
			const clusterReports = await prisma.clusterReport.findMany({
				where: {
					clusterId: cluster.clusterId
				},
				select: {
					report: {
						select: {
							reportId: true,
							priorityIndex: true,
							latitude: true,
							longitude: true
						}
					}
				}
			});

			const priorityScoresCount = {
				'HIGH': 0,
				'MEDIUM': 0,
				'LOW': 0
			};

			let highestPriorityScore = 0;
			let mostReportedPriority = 'LOW';
			for (let r of clusterReports) {
				const l = r.report.priorityIndex;
				priorityScoresCount[l]++;
			}

			for (let k in priorityScoresCount) {
				if (priorityScoresCount[k] > highestPriorityScore) {
					highestPriorityScore = priorityScoresCount[k];
					mostReportedPriority = k;
				}
			}

			// get center of coords for new lat, long
			const { latitude: cLat, longitude: cLong } = getCenter(clusterReports.map(cR => ({ latitude: cR.report.latitude, longitude: cR.report.longitude })));

			// update current cluster
			await prisma.cluster.update({
				where: {
					clusterId: cluster.clusterId
				},
				data: {
					priorityIndex: mostReportedPriority,
					latitude: cLat,
					longitude: cLong,
					points: cluster.points + points
				}
			});

			points = cluster.points + points;

			// if points are above threshold, public reports
			if ((cluster.points + points) >= 10) {
				await prisma.report.update({
					where: {
						reportId: report.reportId
					},
					data: {
						isPublic: true
					}
				});

				for (let cR of clusterReports) {
					await prisma.report.update({
						where: {
							reportId: cR.report.reportId,
						},
						data: {
							isPublic: true
						}
					});
				}
			}
			
			clusterId = cluster.clusterId;
		}

		await prisma.clusterReport.create({
			data: {
				clusterId,
				reportId: report.reportId
			}
		});

		report.isPublic = points >= 10;

		return res.status(200).send({ success: true, report });
	} catch (e) {
		console.error(e.message);
		return res.status(500).send({ success: false, error: 'failed to create report' });
	}
});

module.exports = router;
