const express = require('express');
const { getAllData, createData, getDataById, patchData, deleteData } = require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.route('/').get(getAllData).post(createData);
customerRouter.route('/:id').get(getDataById).patch(patchData).delete(deleteData);

module.exports = customerRouter;
