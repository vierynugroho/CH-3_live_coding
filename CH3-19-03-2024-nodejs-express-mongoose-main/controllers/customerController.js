const Customer = require('./../models/customerModel');

const getCustomers = async (req, res, next) => {
	try {
		const customers = await Customer.find();

		res.status(200).json({
			status: 'success',
			totalData: customers.length,
			requestAt: req.requestTime,
			data: {
				customers,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'failed',
			message: error.message,
		});
	}
};

const getCustomerById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const customer = await Customer.findById(id);

		res.status(200).json({
			status: 'success',
			data: {
				customer,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'failed',
			message: error.message,
		});
	}
};

const createCustomer = async (req, res) => {
	try {
		const newCustomer = await Customer.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				customer: newCustomer,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'failed',
			message: error.message,
		});
	}
};

const updateCustomer = async (req, res) => {
	try {
		const id = req.params.id;
		const customer = await Customer.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			message: 'update success',
			data: customer,
		});
	} catch (error) {
		res.status(400).json({
			status: 'failed',
			message: error.message,
		});
	}
};

const deleteCustomer = async (req, res) => {
	try {
		const id = req.params.id;
		await Customer.findByIdAndDelete(id, req.body, {
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			message: 'delete success',
		});
	} catch (error) {
		res.status(400).json({
			status: 'failed',
			message: error.message,
		});
	}
};

module.exports = {
	getCustomers,
	getCustomerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
};
