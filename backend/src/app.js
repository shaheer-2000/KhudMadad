const express = require('express');
const app = express();

const affiliationRoutes = require('./routes/affiliation');
const loginRoute = require('./routes/login');
const userRoutes = require('./routes/users');

const { verifyJWT, errorHandler } = require('./lib/utils');

app.use(verifyJWT);

// app routes here
app.use('/login', loginRoute);
app.use('/affiliations', affiliationRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

module.exports = () => {
	return app;
};
