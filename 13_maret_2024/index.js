const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const { randomUUID } = require('crypto');

//! config
const app = express();
dotenv.config();

//! Middleware
app.use(express.json());

//! declaration var config
const PORT = process.env.PORT;

//! service
const getAll = (filename) => {
	const data = JSON.parse(fs.readFileSync(`${__dirname}/public/data/${filename}`));
	return data;
};

const insertCustomer = (filename, data) => {
	fs.writeFileSync(`${__dirname}/public/data/${filename}`, JSON.stringify(data));
	return data;
};

//! route
app.get('/', (req, res, next) => {
	res.send('Hi World');
});

app.get('/api/v1/customers', (req, res, next) => {
	res.status(200).json({
		status: 'OK',
		length: getAll('data.json').length,
		data: getAll('data.json'),
	});
});

app.post('/api/v1/customers', (req, res, next) => {
	const customers = getAll('data.json');
	const data = req.body;
	data.id = randomUUID();

	customers.push(data);

	insertCustomer('data.json', customers);

	res.status(201).json({
		status: 'OK',
		length: getAll('data.json').length,
		data,
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
