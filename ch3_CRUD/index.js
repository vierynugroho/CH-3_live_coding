const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const customerRouter = require('./routes/customerRoutes');

//! ------------- config -------------
const app = express();
dotenv.config();

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

//! ------------- declaration var config -------------
const PORT = process.env.PORT;

//! ------------- routes -------------
app.use('/api/v1/customers', customerRouter);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
