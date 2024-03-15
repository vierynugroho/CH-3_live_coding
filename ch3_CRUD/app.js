const express = require('express');
const morgan = require('morgan');
const customerRouter = require('./routes/customerRoutes');

//! ------------- config -------------
const app = express();

//! ------------- Middleware -------------
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
	console.log('Ramadhan Kareem abangkuuuh, ini middleware kitee');
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

//! ------------- routes -------------
app.use('/api/v1/customers', customerRouter);

module.exports = app;
