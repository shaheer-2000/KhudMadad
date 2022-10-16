const multer = require('multer');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

const bcrypt = require('bcrypt');

const geolib = require('geolib');

const { PrismaClient, OrgType, AppStatus, PriorityIndex, DisasterType } = require('@prisma/client');

const SALT_ROUNDS = 16;
const JWT_ALGO = 'HS256';
const JWT_EXPIRY = '3000s'; // 5 mins
const EXEMPT_PATHS = ['/login', '/users/signup'];

const prisma = new PrismaClient();

const luxon = require('luxon');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "KhudMadad"
	}
});

const upload = multer({ storage });

const genHash = (password) => bcrypt.hashSync(password, SALT_ROUNDS);
const verifyPass = (password, hash) => bcrypt.compareSync(password, hash);

const genJWT = (payload) => jwt.sign(payload, process.env.JWT_SECRET, {
	algorithm: JWT_ALGO,
	expiresIn: JWT_EXPIRY
});

const verifyJWT = expressjwt(
	{
		secret: process.env.JWT_SECRET,
		algorithms: [JWT_ALGO] // symmetric
	}).unless({ path: EXEMPT_PATHS });

const errorHandler = (err, req, res, next) => {
	if (err) {
		res.status(404).send({
			error: 'page not found'
		});
	}
	next();
};

// in KM
const getDistance = (pointOne, pointTwo) => {
	return geolib.getDistance(pointOne, pointTwo) / 1000;
};

const getCenter = (points) => {
	return geolib.getCenter(points);
};

const isInRadius = (pointOne, pointTwo, radius) => {
	return (geolib.getDistance(pointOne, pointTwo) / 1000) <= radius;
};

const priorityIndexMap = {
	'HIGH': ['HIGH', 'MEDIUM'],
	'MEDIUM': ['MEDIUM', 'LOW'],
	'LOW': ['MEDIUM', 'LOW']
};

const addHours = (dateTime, hours) => {
	return dateTime.plus({ hours });
};

const subHours = (dateTime, hours) => {
	return dateTime.minus({ hours });
};

const getAsDateTime = (timestampInISO) => {
	return luxon.DateTime.fromISO(timestampInISO);
};

const getAsISOString = (luxonDateTime) => {
	return luxonDateTime.toISO();
};

module.exports = {
	genHash,
	verifyPass,
	genJWT,
	verifyJWT,
	errorHandler,
	prisma,
	OrgType,
	AppStatus,
	DisasterType,
	PriorityIndex,
	upload,
	isInRadius,
	priorityIndexMap,
	getAsDateTime,
	addHours,
	subHours,
	getAsISOString,
	getDistance,
	getCenter
};
