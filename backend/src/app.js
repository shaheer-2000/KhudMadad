const express = require('express');
const app = express();

const morgan = require('morgan');

const affiliationRoutes = require('./routes/affiliation');
const loginRoute = require('./routes/login');
const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/reports');
const clusterRoutes = require('./routes/clusters');

const { verifyJWT, errorHandler } = require('./lib/utils');

app.use(morgan('tiny'));

app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());

app.use(verifyJWT);

// app routes here
app.use('/login', loginRoute);
app.use('/affiliations', affiliationRoutes);
app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
app.use('/clusters', clusterRoutes);

app.use(errorHandler);

module.exports = () => {
	return app;
};
