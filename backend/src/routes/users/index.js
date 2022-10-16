const { Router } = require('express');
const router = Router();

const { genHash, prisma } = require('../../lib/utils');

router.get('/:username', async (req, res) => {
	const { username } = req.params;

	if (typeof username === 'undefined') {
		return res.status(500).send({
			success: false,
			error: 'no username provided'
		});
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				username
			},
			select: {
				username: true,
				firstName: true,
				lastName: true,
				email: true,
				affiliation: {
					select: {
						orgName: true,
						orgType: true
					}
				},
				_count: {
					select: {
						reports: true
					}
				}
			}
		});

		return res.status(200).send(user);
	} catch (e) {
		console.error(e.message);
		res.status(500).send({
			success: false,
			error: 'failed to fetch user'
		});
	}
});

router.post('/signup', async (req, res) => {
	// ideally we'll have a schema (joi or something) to resolve
	// issues of bad payloads
	const {
		username,
		password,
		firstName,
		lastName,
		email,
		mobileNum,
		idNum,
	} = req.body;

	// try adding user to database
	const hash = genHash(password);

	try {
		// add support for automatically filling NGO/Govt affiliation table
		const user_ = await prisma.user.create({
			data: {
				username,
				password: hash,
				firstName,
				lastName,
				email,
				mobileNum,
				idNum,
			},
		});

		if (typeof user_ === 'undefined') {
			throw new Error('failed to create user');
		}

		return res.status(200).send({ success: true });
	} catch (e) {
		return res.status(500).send({ success: false, error: 'failed to create user' });
	}
});

module.exports = router;
