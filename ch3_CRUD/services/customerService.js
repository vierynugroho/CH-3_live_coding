const fs = require('fs');

const writeFile = (data) => {
	fs.writeFileSync(`${__dirname}/../public/data/data.json`, JSON.stringify(data));
	return data;
};

const getAll = () => {
	const data = JSON.parse(fs.readFileSync(`${__dirname}/../public/data/data.json`));

	return data;
};

const getById = (id) => {
	const data = getAll().find((cust) => cust._id === id);
	if (!data) {
		throw Error('Customer not found!');
	}

	return data;
};

module.exports = {
	writeFile,
	getAll,
	getById,
};
