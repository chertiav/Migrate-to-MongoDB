const createHttpError = require('http-errors');
const { ObjectId } = require('mongodb');
//=============================================

const { books: Book } = require('../db/models');

class BookController {
	async getBooks(req, res, next) {
		const { limit, skip } = req.pagination;
		try {
			const allBooks = await Book.find({}, null, {
				sort: { title: 1 },
				skip,
				limit,
			});
			if (allBooks) {
				res.status(200).json(allBooks);
			} else {
				next(createHttpError(404, `Any books hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async getOneBook(req, res, next) {
		try {
			const id = req.params.id;
			const aggregationBook = [
				{ $match: { _id: ObjectId(id) } },
				{
					$lookup: {
						from: 'shelves',
						localField: 'shelf_id',
						foreignField: '_id',
						as: 'shelf',
					},
				},
				{
					$project: {
						_id: 1,
						title: 1,
						genres: 1,
						description: 1,
						image: 1,
						authors: 1,
						requests: 1,
						shelf: { code: 1 },
					},
				},
			];
			const bookById = await Book.aggregate(aggregationBook);
			if (bookById) {
				res.status(200).json(bookById);
			} else {
				next(createHttpError(404, `Any book hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async createBook(req, res, next) {
		try {
			const body = req.body;
			const createdBook = await new Book(body).save();
			if (createdBook) {
				res.status(200).json(createdBook);
			} else {
				next(createHttpError(404, `Book not found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async updateBook(req, res, next) {
		try {
			const body = req.body;
			const updetedBook = await Book.findOneAndReplace({ _id: body.id }, body, {
				returnDocument: 'after',
			});
			if (updetedBook) {
				res.status(200).json(updetedBook);
			} else {
				next(createHttpError(404, `Book hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async changeBook(req, res, next) {
		try {
			const {
				params: { id },
				body,
			} = req;
			const updetedBook = await Book.findByIdAndUpdate(id, body, {
				returnDocument: 'after',
			});
			if (updetedBook) {
				res.status(200).json(updetedBook);
			} else {
				next(createHttpError(404, `Book hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async deleteBook(req, res, next) {
		try {
			const id = req.params.id;
			const deletedBook = await Book.findByIdAndDelete(id);
			if (deletedBook) {
				res.sendStatus(res.statusCode);
			} else {
				next(createHttpError(404, `Book hasn't been delete`));
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new BookController();
