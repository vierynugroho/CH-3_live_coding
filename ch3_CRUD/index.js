const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const { randomUUID } = require('crypto');

//! ------------- config -------------
const app = express();
dotenv.config();

//! ------------- Middleware -------------
app.use(express.json());

//! ------------- declaration var config -------------
const PORT = process.env.PORT;

//! ------------- service ------------------
const getAll = () => {
	const data = JSON.parse(fs.readFileSync(`${__dirname}/public/data/data.json`));

	return data;
};

const getById = (id) => {
	const data = getAll().find((cust) => cust._id === id);
	if (!data) {
		throw Error('Customer not found!');
	}

	return data;
};

const writeFile = (data) => {
	fs.writeFileSync(`${__dirname}/public/data/data.json`, JSON.stringify(data));
	return data;
};

//! ------------- Controller -------------
const getRoot = (req, res, next) => {
	res.send('Welcome tuh API akuuuuh');
};

const getAllData = (req, res) => {
	try {
		const data = getAll();

		res.status(200).json({
			status: 'OK',
			length: data.length,
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			status: 'FAIL',
			message: `${error}`,
		});
	}
};

const getDataById = (req, res) => {
	try {
		const { id } = req.params;
		const customer = getById(id);

		res.status(200).json({
			status: 'OK',
			data: customer,
		});
	} catch (error) {
		res.status(404).json({
			status: 'FAIL',
			message: `${error}`,
		});
	}
};

const createData = (req, res) => {
	try {
		const customers = getAll();
		const data = req.body;
		data._id = randomUUID();

		customers.push(data);

		writeFile(customers);

		res.status(201).json({
			status: 'OK',
			length: getAll().length,
			data,
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: `${error}`,
		});
		res.status(500).json({
			status: 'FAIL',
			message: `${error}`,
		});
	}
};

const patchData = (req, res) => {
	try {
		const { id } = req.params;
		//TODO: validation id customer
		getById(id);

		const customers = getAll();
		const customerIndex = customers.findIndex((cust) => cust._id === id);

		customers[customerIndex] = { ...customers[customerIndex], ...req.body };

		writeFile(customers);

		res.status(200).json({
			status: 'OK',
			message: 'Customer Updated!',
			data: {
				customer: customers[customerIndex],
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: `${error}`,
		});
		res.status(500).json({
			status: 'FAIL',
			message: `${error}`,
		});
	}
};

const deleteData = (req, res) => {
	try {
		const { id } = req.params;
		//TODO: validation id customer
		getById(id);

		const customersUndeleted = getAll().filter((customer) => customer._id !== id);
		writeFile(customersUndeleted);

		res.status(200).json({
			status: 'success',
			message: 'Customer deleted!',
			length: customersUndeleted.length,
			data: customersUndeleted,
		});
	} catch (error) {
		res.status(500).json({
			status: 'FAIL',
			message: `${error}`,
		});
	}
};

//! ------------- routes -------------
app.get('/', getRoot);

//TODO: get all data
app.get('/api/v1/customers', getAllData);

//TODO: get data by ID
app.get('/api/v1/customers/:id', getDataById);

//TODO: post data
app.post('/api/v1/customers', createData);

//? PUT / PATCH ?
//* PUT
// update semua data
//* PATCH
// update data yang diperlukan
//TODO: patch data
app.patch('/api/v1/customers/:id', patchData);

//TODO: delete data
app.delete('/api/v1/customers/:id', deleteData);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
