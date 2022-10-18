const createHttpError = require('http-errors');
//=============================================

const { authors: Author } = require('../db/models');

class AuthorController {
	async getAuthors(req, res, next) {
		const { limit, skip } = req.pagination;
		try {
			const allAuthors = await Author.find({}, null, {
				sort: { name: 1 },
				skip,
				limit,
			});
			if (allAuthors) {
				res.status(200).json(allAuthors);
			} else {
				next(createHttpError(404, `Any Author hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async getOneAuthor(req, res, next) {
		try {
			const id = req.params.id;
			const authorById = await Author.findById(id);
			if (authorById) {
				res.status(200).json(authorById);
			} else {
				next(createHttpError(404, `Any author hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async createAuthor(req, res, next) {
		try {
			const body = req.body;
			const createdAuthor = await new Author(body).save();
			if (createdAuthor) {
				res.status(200).json(createdAuthor);
			} else {
				next(createHttpError(404, `Author not found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async updateAuthor(req, res, next) {
		try {
			const body = req.body;
			const updetedAuthor = await Author.findOneAndReplace(
				{ _id: body.id },
				body,
				{ returnDocument: 'after' },
			);
			if (updetedAuthor) {
				res.status(200).json(updetedAuthor);
			} else {
				next(createHttpError(404, `Author hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async changeAuthor(req, res, next) {
		try {
			const {
				params: { id },
				body,
			} = req;
			const updetedAuthor = await Author.findByIdAndUpdate(id, body, {
				returnDocument: 'after',
			});
			if (updetedAuthor) {
				res.status(200).json(updetedAuthor);
			} else {
				next(createHttpError(404, `Author hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async deleteAuthor(req, res, next) {
		try {
			const id = req.params.id;
			const deletedAuthor = await Author.findByIdAndDelete(id);
			if (deletedAuthor) {
				res.sendStatus(res.statusCode);
			} else {
				next(createHttpError(404, `Author hasn't been delete`));
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthorController();
