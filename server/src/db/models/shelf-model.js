const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const shelfSchema = new Schema({
	code: {
		type: String,
		required: [true, 'shelf code is required'],
		trim: true,
	},
	description: String,
});

const Shelf = mongoose.model('shelves', shelfSchema);

module.exports = Shelf;
