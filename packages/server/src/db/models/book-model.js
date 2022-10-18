const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bookSchema = new Schema({
	title: {
		type: String,
		required: [true, 'title is required'],
		trim: true,
	},
	genres: [String],
	shelf_id: Schema.Types.ObjectId,
	description: String,
	image: String,
	authors: [String],
	requests: [String],
});

const Book = mongoose.model('books', bookSchema);

module.exports = Book;
