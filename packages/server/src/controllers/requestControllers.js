const createHttpError = require('http-errors');
const { ObjectId } = require('mongodb');
//=============================================

const { requests: Request } = require('../db/models');

class RequestController {
	async getRequests(req, res, next) {
		const { limit, skip } = req.pagination;
		try {
			const allRequests = await Request.find({}, null, {
				sort: { code: 1 },
				skip,
				limit,
			});
			if (allRequests) {
				res.status(200).json(allRequests);
			} else {
				next(createHttpError(404, `Any request hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async getOneRequest(req, res, next) {
		try {
			const id = req.params.id;
			const aggregationRequest = [
				{ $match: { _id: ObjectId(id) } },
				{
					$lookup: {
						from: 'customers',
						localField: 'customer_id',
						foreignField: '_id',
						as: 'customer',
					},
				},
				{
					$project: {
						_id: 1,
						code: 1,
						date: 1,
						books: 1,
						customer: { name: 1, email: 1 },
					},
				},
			];
			const requestById = await Request.aggregate(aggregationRequest);
			if (requestById) {
				res.status(200).json(requestById);
			} else {
				next(createHttpError(404, `Any request hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async createRequest(req, res, next) {
		try {
			const body = req.body;
			const createdRequest = await new Request(body).save();
			if (createdRequest) {
				res.status(200).json(createdRequest);
			} else {
				next(createHttpError(404, `Request not found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async updateRequest(req, res, next) {
		try {
			const body = req.body;
			const updetedRequest = await Request.findOneAndReplace(
				{ _id: body.id },
				body,
				{ returnDocument: 'after' },
			);
			if (updetedRequest) {
				res.status(200).json(updetedRequest);
			} else {
				next(createHttpError(404, `Request hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async changeRequest(req, res, next) {
		try {
			const {
				params: { id },
				body,
			} = req;
			const updetedRequest = await Request.findByIdAndUpdate(id, body, {
				returnDocument: 'after',
			});
			if (updetedRequest) {
				res.status(200).json(updetedRequest);
			} else {
				next(createHttpError(404, `Request hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async deleteRequest(req, res, next) {
		try {
			const id = req.params.id;
			const deletedRequest = await Request.findByIdAndDelete(id);
			if (deletedRequest) {
				res.sendStatus(res.statusCode);
			} else {
				next(createHttpError(404, `Request hasn't been delete`));
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new RequestController();
