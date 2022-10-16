const { Router } = require('express');
const router = Router();

const { verifyPass, genJWT, prisma } = require('../../lib/utils');

router.post('/', async (req, res) => {
	const { username, password } = req.body;

	if (typeof username === 'undefined' || typeof password === 'undefined') {
		return res.status(401).send({ success: false, error: 'no username or password provided'});
	}

	// const _hash = bcrypt.hashSync(password, saltRounds);
	// get hash from db
	let hash = null;
	try {
		const { password: hash_ } = await prisma.user.findUnique({
			where: {
				username
			},
			select: {
				password: true
			}
		});

		hash = hash_; // refactor later
	} catch (e) {
		return res.status(500).send({ success: false, error: 'no such user exists' });
	}

	const logged_in = verifyPass(password, hash);

	if (!logged_in) {
		return res.status(401).send({ success: false, error: 'invalid password'});
	}

	const token = genJWT(
		{
			username: username,
		}
	);

	res.status(200).send({
		success: true,
		token
	});
});

module.exports = router;
