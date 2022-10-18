const createHttpError = require('http-errors');
//=============================================

const { customers: Customer } = require('../db/models');

class CustomerController {
	async getCustomers(req, res, next) {
		const { limit, skip } = req.pagination;
		try {
			const allCustomers = await Customer.find({}, null, {
				sort: { name: 1 },
				skip,
				limit,
			});
			if (allCustomers) {
				res.status(200).json(allCustomers);
			} else {
				next(createHttpError(404, `Any Customers hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async getOneCustomer(req, res, next) {
		try {
			const id = req.params.id;
			const customerById = await Customer.findById(id);
			if (customerById) {
				res.status(200).json(customerById);
			} else {
				next(createHttpError(404, `Any customer hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async createCustomer(req, res, next) {
		try {
			const body = req.body;
			const createdCustomer = await new Customer(body).save();
			if (createdCustomer) {
				res.status(200).json(createdCustomer);
			} else {
				next(createHttpError(404, `Customer not found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async updateCustomer(req, res, next) {
		try {
			const body = req.body;
			const updetedCustomer = await Customer.findOneAndReplace(
				{ _id: body.id },
				body,
				{ returnDocument: 'after' },
			);
			if (updetedCustomer) {
				res.status(200).json(updetedCustomer);
			} else {
				next(createHttpError(404, `Customer hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async changeCustomer(req, res, next) {
		try {
			const {
				params: { id },
				body,
			} = req;
			const updetedCustomer = await Customer.findByIdAndUpdate(id, body, {
				returnDocument: 'after',
			});
			if (updetedCustomer) {
				res.status(200).json(updetedCustomer);
			} else {
				next(createHttpError(404, `Customer hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async deleteCustomer(req, res, next) {
		try {
			const id = req.params.id;
			const deletedCustomer = await Customer.findByIdAndDelete(id);
			if (deletedCustomer) {
				res.sendStatus(res.statusCode);
			} else {
				next(createHttpError(404, `Customer hasn't been delete`));
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new CustomerController();
