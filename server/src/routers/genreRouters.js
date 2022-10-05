const express = require('express');
//==================================
const genreControllers = require('../controllers/genreControllers');
const genreRouter = new express.Router();
const { validate, pagination } = require('../middleware');

genreRouter
	.route('/')
	.get(pagination.pagination, genreControllers.getGenres)
	.post(validate.validateNewGenre, genreControllers.createGenre)
	.put(validate.validateNewGenre, genreControllers.updateGenre);

genreRouter
	.route('/:id')
	.get(genreControllers.getOneGenre)
	.patch(validate.validateChangeGenre, genreControllers.changeGenre)
	.delete(genreControllers.deleteGenre);

module.exports = genreRouter;
