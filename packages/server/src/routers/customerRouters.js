const express = require('express');
//==================================
const customerControllers = require('../controllers/customerControllers');
const customerRouter = new express.Router();
const { validate, pagination, hashPassword } = require('../middleware');

customerRouter
	.route('/')
	.get(pagination.pagination, customerControllers.getCustomers)
	.post(
		validate.validateNewCustomer,
		hashPassword.hashPassword,
		customerControllers.createCustomer,
	)
	.put(
		validate.validateNewCustomer,
		hashPassword.hashPassword,
		customerControllers.updateCustomer,
	);

customerRouter
	.route('/:id')
	.get(customerControllers.getOneCustomer)
	.patch(validate.validateChangeCustomer, customerControllers.changeCustomer)
	.delete(customerControllers.deleteCustomer);

module.exports = customerRouter;
