const { Router } = require('express');
const router = Router();

const { prisma, isInRadius, getDistance, getCenter } = require('../../lib/utils');

router.get('/', async (req, res) => {
	const {
		longitude,
		latitude
	} = req.query;

	try {
		const centerPoint = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
		console.log(centerPoint);
		const clusters = await prisma.cluster.findMany({
			select: {
				disasterType: true,
				priorityIndex: true,
				latitude: true,
				longitude: true,
				clusterReports: {
					select: {
						report: true
					}
				}
			}
		});
		const closestClusters = clusters.filter((c) => {
			return isInRadius(centerPoint, { latitude: c.latitude, longitude: c.longitude }, 100);
		});
		const sortedClusters = closestClusters.sort((a, b) => {
			const bDist = getDistance(centerPoint, { latitude: b.latitude, longitude: b.longitude });
			const aDist = getDistance(centerPoint, { latitude: a.latitude, longitude: a.longitude });

			return aDist - bDist;
		});
		
		return res.status(200).send(sortedClusters);
	} catch (e) {
		console.error(e);
		res.status(500).send({
			success: false,
			error: 'failed to fetch clusters'
		});
	}
});

module.exports = router;
