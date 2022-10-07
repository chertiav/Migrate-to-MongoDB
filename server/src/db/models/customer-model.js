const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const customerSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'name customer is required'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'email is required'],
	},
	birthday: Date,
	address: {
		country: String,
		city: String,
		street: String,
		building: String,
		app: String,
		zipcode: String,
	},
	phone: {
		home: String,
		office: String,
	},
	description: String,
	password: String,
	requests: [String],
});

const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;
