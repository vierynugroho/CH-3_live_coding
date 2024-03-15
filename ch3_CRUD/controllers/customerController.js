const { getAll, getById, writeFile } = require('../services/customerService');

const { randomUUID } = require('crypto');

const getAllData = (req, res) => {
	try {
		const data = getAll();

		res.status(200).json({
			status: 'OK',
			length: data.length,
			requestAt: req.requestTime,
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
			length: customers.length,
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

module.exports = {
	getAllData,
	getDataById,
	patchData,
	createData,
	deleteData,
};
