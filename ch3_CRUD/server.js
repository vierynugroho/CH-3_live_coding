require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');

//! ------------- declaration var config -------------
const PORT = process.env.PORT;

//! ------------ DB Config -----------------
const DB = process.env.DATABASE_URL;

mongoose
	.connect(DB)
	.then((conn) => {
		console.log(`Connection DB Success!!`);
	})
	.catch((err) => {
		console.log(`Error: ${err}`);
	});

//! create schema / design table
const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name must be required'],
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
		default: 'Indonesia',
	},
});

//! model names are automatically generated in plural form
const Customer = mongoose.model('Customer', customerSchema);

//! create dummy data
const test_customer = new Customer({
	name: 'Viery',
	phoneNumber: 123456,
	email: 'vvv@gmail.com',
	city: 'Blitar',
});

//! exct insert db
test_customer
	.save()
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err.message);
	});

app.listen(PORT, () => {
	console.log(`Ramadhan Karemmm Abangkuuh!. Server running on http://localhost:${PORT}`);
});
