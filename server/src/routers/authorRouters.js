const { Router } = require('express');
//==================================
const authorControllers = require('../controllers/authorControllers');
const authorRouter = new Router();
const { validate, pagination } = require('../middleware');

authorRouter
	.route('/')
	.get(pagination.pagination, authorControllers.getAuthors)
	.post(validate.validateNewAuthor, authorControllers.createAuthor)
	.put(validate.validateNewAuthor, authorControllers.updateAuthor);

authorRouter
	.route('/:id')
	.get(authorControllers.getOneAuthor)
	.patch(validate.validateChangeAuthor, authorControllers.changeAuthor)
	.delete(authorControllers.deleteAuthor);

module.exports = authorRouter;
