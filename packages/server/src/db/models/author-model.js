const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const authorSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'name is required'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'email is required'],
	},
	birthday: Date,
	death: Date,
	books: [String],
	description: String,
});

const Author = mongoose.model('authors', authorSchema);

module.exports = Author;
