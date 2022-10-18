const createHttpError = require('http-errors');
//=============================================

const { genres: Genre } = require('../db/models');

class GenreController {
	async getGenres(req, res, next) {
		const { limit, skip } = req.pagination;
		try {
			const allGenres = await Genre.find({}, null, {
				sort: { title: 1 },
				skip,
				limit,
			});
			if (allGenres) {
				res.status(200).json(allGenres);
			} else {
				next(createHttpError(404, `Any genre hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async getOneGenre(req, res, next) {
		try {
			const id = req.params.id;
			const genreById = await Genre.findById(id);
			if (genreById) {
				res.status(200).json(genreById);
			} else {
				next(createHttpError(404, `Any genre hasn't been found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async createGenre(req, res, next) {
		try {
			const body = req.body;
			const createdGenre = await new Genre(body).save();
			if (createdGenre) {
				res.status(200).json(createdGenre);
			} else {
				next(createHttpError(404, `Genre not found`));
			}
		} catch (error) {
			next(error);
		}
	}
	async updateGenre(req, res, next) {
		try {
			const body = req.body;
			const updetedGenre = await Genre.findOneAndReplace(
				{ _id: body.id },
				body,
				{ returnDocument: 'after' },
			);
			if (updetedGenre) {
				res.status(200).json(updetedGenre);
			} else {
				next(createHttpError(404, `Genre hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async changeGenre(req, res, next) {
		try {
			const {
				params: { id },
				body,
			} = req;
			const updetedGenre = await Genre.findByIdAndUpdate(id, body, {
				returnDocument: 'after',
			});
			if (updetedGenre) {
				res.status(200).json(updetedGenre);
			} else {
				next(createHttpError(404, `Genre hasn't been updeted`));
			}
		} catch (error) {
			next(error);
		}
	}
	async deleteGenre(req, res, next) {
		try {
			const id = req.params.id;
			const deletedGenre = await Genre.findByIdAndDelete(id);
			if (deletedGenre) {
				res.sendStatus(res.statusCode);
			} else {
				next(createHttpError(404, `Genre hasn't been delete`));
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new GenreController();
