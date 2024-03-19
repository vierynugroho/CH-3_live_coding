const express = require('express');

const router = express.Router();

const products = [{ title: 'prod-1' }, { title: 'prod-2' }];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
	let data = {
		page_title: 'Add Product',
		path: req.path,
	};

	res.render('add-product', data);
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
	products.push({ title: req.body.title });

	res.redirect('/');
});

module.exports = router;
module.exports.data = { products };
