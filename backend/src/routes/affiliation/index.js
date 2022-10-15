const { Router } = require('express');
const router = Router();

const { prisma, AppStatus } = require('../../lib/utils');

router.post('/verdict/:username', async (req, res) => {
	const { username } = req.params;
	const { verdict } = req.body;

	if (typeof username === 'undefined' || typeof verdict === 'undefined') {
		return res.status(500).send({ success: false, error: 'no username or verdict provided'});
	}

	const standardizedVerdict = AppStatus[verdict.toUpperCase()];

	if (typeof standardizedVerdict === 'undefined') {
		return res.status(500).send({ success: false, error: 'invalid verdict provided'});
	}

	// app status should not be changed to pending*
	// if already accepted/rejected, don't change

	try {
		const { orgName, orgType } = await prisma.affiliateApp.update({
			where: {
				username
			},
			data: {
				status: standardizedVerdict
			},
			select: {
				orgName,
				orgType
			}
		});

		if (standardizedVerdict !== AppStatus['APPROVED']) {
			return res.status(200).send({ success: true });
		}

		const affiliation = await prisma.affiliation.create({
			data: {
				username,
				orgName,
				orgType
			}
		});

		return res.status(200).send({
			success: true,
			affiliation
		});
	} catch (e) {
		return res.status(500).send({
			success: false,
			error: 'failed to run db operations'
		});
	}
});

module.exports = router;
