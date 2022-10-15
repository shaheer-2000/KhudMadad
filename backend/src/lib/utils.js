const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const bcrypt = require('bcrypt');
const { PrismaClient, OrgType, AppStatus, PriorityIndex, DisasterType } = require('@prisma/client');

const SALT_ROUNDS = 16;
const JWT_ALGO = 'HS256';
const JWT_EXPIRY = '3000s'; // 5 mins
const EXEMPT_PATHS = ['/login', '/users/signup'];

const prisma = new PrismaClient();

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

const errorHandler = (err, req, res, next) => {};

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
	PriorityIndex
};
