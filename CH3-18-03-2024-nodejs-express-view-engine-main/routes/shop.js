const express = require('express');

const router = express.Router();

const admin_data = require('./admin');

router.get('/', (req, res, next) => {
	const data = {
		title: 'SHOP - FSW 1',
		products: admin_data.data.products,
	};

	res.render('shop', data);
});

module.exports = router;
