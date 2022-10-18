const { Router } = require('express');
//==================================
const requestControllers = require('../controllers/requestControllers');
const requestRouter = new Router();
const { validate, pagination } = require('../middleware');

requestRouter
	.route('/')
	.get(pagination.pagination, requestControllers.getRequests)
	.post(validate.validateNewRequest, requestControllers.createRequest)
	.put(validate.validateNewRequest, requestControllers.updateRequest);

requestRouter
	.route('/:id')
	.get(requestControllers.getOneRequest)
	.patch(validate.validateChangeRequest, requestControllers.changeRequest)
	.delete(requestControllers.deleteRequest);

module.exports = requestRouter;
