const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const requestSchema = new Schema({
	code: {
		type: String,
		required: [true, 'code is required'],
		trim: true,
	},
	date: {
		type: Date,
		required: [true, 'date is required'],
	},
	customer_id: Schema.Types.ObjectId,
	books: [String],
	description: String,
});

const Request = mongoose.model('requests', requestSchema);

module.exports = Request;
