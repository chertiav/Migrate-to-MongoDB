const createHttpError = require('http-errors');
//=============================================

const { shelves: Shelf } = require('../db/models');

class ShelfController {
	async getShelves(req, res, next) {
		const { limit, skip } = req.pagination;
		try {
			const allShelves = await Shelf.find({}, null, {
				sort: { _id: 1 },
				skip,
				limit,
			});
			if (allShelves) {
				res.status(200).json(allShelves);
			} else {
				next(createHttpError(404, `Any shelves hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async getOneShelf(req, res, next) {
		try {
			const id = req.params.id;
			const shelfById = await Shelf.findById(id);
			if (shelfById) {
				res.status(200).json(shelfById);
			} else {
				next(createHttpError(404, `Any shelves hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async createShelf(req, res, next) {
		try {
			const body = req.body;
			const createdShelf = await new Shelf(body).save();
			if (createdShelf) {
				res.status(200).json(createdShelf);
			} else {
				next(createHttpError(404, `Shelf not found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async updateShelf(req, res, next) {
		try {
			const body = req.body;
			const updetedShelf = await Shelf.findOneAndReplace(
				{ _id: body.id },
				body,
				{ returnDocument: 'after' },
			);
			if (updetedShelf) {
				res.status(200).json(updetedShelf);
			} else {
				next(createHttpError(404, `Shelf hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async changeShelf(req, res, next) {
		try {
			const {
				params: { id },
				body,
			} = req;
			const updetedShelf = await Shelf.findByIdAndUpdate(id, body, {
				returnDocument: 'after',
			});
			if (updetedShelf) {
				res.status(200).json(updetedShelf);
			} else {
				next(createHttpError(404, `Shelf hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async deleteShelf(req, res, next) {
		try {
			const id = req.params.id;
			const deletedShelf = await Shelf.findByIdAndDelete(id);
			if (deletedShelf) {
				res.sendStatus(res.statusCode);
			} else {
				next(createHttpError(404, `Shelf hasn't been delete`));
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ShelfController();
