const express = require('express');
//==================================
const shelfControllers = require('../controllers/shelfControllers');
const shelfRouter = new express.Router();
const { validate, pagination } = require('../middleware');

shelfRouter
	.route('/')
	.get(pagination.pagination, shelfControllers.getShelves)
	.post(validate.validateNewShelf, shelfControllers.createShelf)
	.put(validate.validateNewShelf, shelfControllers.updateShelf);

shelfRouter
	.route('/:id')
	.get(shelfControllers.getOneShelf)
	.patch(validate.validateChangeShelf, shelfControllers.changeShelf)
	.delete(shelfControllers.deleteShelf);

module.exports = shelfRouter;
