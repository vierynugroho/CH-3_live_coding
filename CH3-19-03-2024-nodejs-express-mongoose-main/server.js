require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT;

const DB = process.env.DATABASE_URL;

mongoose.connect(DB).then((con) => {
	console.log('connection ke database sukses');
});

app.listen(PORT, () => {
	console.log(`APP running on port : ${PORT}`);
});
