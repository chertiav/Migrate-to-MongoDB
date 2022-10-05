const express = require('express');
//==================================
const bookControllers = require('../controllers/bookControllers');
const bookRouter = new express.Router();
const { validate, pagination } = require('../middleware');

bookRouter
	.route('/')
	.get(pagination.pagination, bookControllers.getBooks)
	.post(validate.validateNewBook, bookControllers.createBook)
	.put(validate.validateNewBook, bookControllers.updateBook);

bookRouter
	.route('/:id')
	.get(bookControllers.getOneBook)
	.patch(validate.validateChangeGenre, bookControllers.changeBook)
	.delete(bookControllers.deleteBook);

module.exports = bookRouter;
