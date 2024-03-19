const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//! -------------- CONFIG ------------------
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//! -------------- ROUTE ------------------
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
	let data = {
		page_title: '404 - Not Found',
		path: req.path,
	};

	res.status(404).render('404', data);
});

app.listen(3000, () => {
	console.log(`Yohooo! http://localhost:3000`);
});
