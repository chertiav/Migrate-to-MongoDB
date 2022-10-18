const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const genreSchema = new Schema({
	title: {
		type: String,
		required: [true, 'title genre is required'],
		trim: true,
	},
	description: String,
});

const Genre = mongoose.model('genres', genreSchema);

module.exports = Genre;
