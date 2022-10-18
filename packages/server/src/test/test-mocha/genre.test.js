const request = require('supertest');
const { assert } = require('chai');
//================================================
const { genres: Genre } = require('../../db/models');
const { app } = require('../../app');
const TEST_CONSTANTS = require('./constants-test');

describe('genreControllers testing', () => {
	beforeEach((done) => {
		Genre.deleteMany({}, (err) => {
			done();
		});
	});
	afterEach((done) => {
		Genre.deleteMany({}, (err) => {
			done();
		});
	});

	describe('getGenres', () => {
		const limit = Math.round(Math.random() * 5) || 5;
		it(`it should GET ${limit} genres`, (done) => {
			Genre.insertMany(TEST_CONSTANTS.GENRES_TEST.GET_GENRES);
			request(app)
				.get(`/api/genres?page=1&result=${limit}`)
				.expect(200)
				.expect((res) => {
					const result = [];
					const expectedResult = TEST_CONSTANTS.GENRES_TEST.GET_GENRES.sort(
						(a, b) => (a.title > b.title ? 1 : -1),
					).slice(0, limit);
					res.body.forEach((item) => {
						const { _id, __v, ...restItem } = item;
						result.push(restItem);
					});
					result.sort((a, b) => (a.title > b.title ? 1 : -1));
					assert.isArray(res.body);
					assert.lengthOf(res.body, limit);
					assert.deepEqual(expectedResult, result);
				})
				.end(done);
		});
	});

	describe('getOneGenre', () => {
		it(`it should GET one genere by Id`, (done) => {
			const expectedResult = TEST_CONSTANTS.GENRES_TEST.CREATE_GENRE;
			const genre = new Genre(expectedResult);
			genre.save();
			request(app)
				.get(`/api/genres/${genre._id}`)
				.expect(200)
				.expect((res) => {
					const { _id, __v, ...resultGenre } = res.body;
					assert.deepEqual(expectedResult, resultGenre);
				})
				.end(done);
		});
	});

	describe('createGenre', () => {
		it(`it should POST a genre`, (done) => {
			const expectedResult = TEST_CONSTANTS.GENRES_TEST.CREATE_GENRE;
			request(app)
				.post('/api/genres')
				.send(expectedResult)
				.expect(200)
				.expect((res) => {
					const { _id, __v, ...result } = res.body;
					assert.deepEqual(expectedResult, result);
				})
				.end(done);
		});
	});

	describe('updateGenre', () => {
		it(`it should PUT a genre`, (done) => {
			const genre = new Genre(TEST_CONSTANTS.GENRES_TEST.CREATE_GENRE);
			genre.save();
			expectedResult = TEST_CONSTANTS.GENRES_TEST.UPDATE_GENRE;
			updatedGenre = { ...expectedResult, id: genre._id };
			request(app)
				.put('/api/genres')
				.send(updatedGenre)
				.expect(200)
				.expect((res) => {
					const { _id, __v, ...result } = res.body;
					assert.deepEqual(expectedResult, result);
				})
				.end(done);
		});
	});

	describe('changeGenre', () => {
		it(`it should PATCH a genre`, (done) => {
			const changeGenreProperties = TEST_CONSTANTS.GENRES_TEST.PATCH_GENRE;
			const defaultGenre = TEST_CONSTANTS.GENRES_TEST.CREATE_GENRE;
			const genre = new Genre(defaultGenre);
			genre.save();
			const expectedResult = {
				...defaultGenre,
				description: changeGenreProperties.description,
			};
			request(app)
				.patch(`/api/genres/${genre._id}`)
				.send(changeGenreProperties)
				.expect(200)
				.expect((res) => {
					const { _id, __v, ...result } = res.body;
					assert.deepEqual(expectedResult, result);
				})
				.end(done);
		});
	});

	describe('deleteGenre', () => {
		it(`it should DELETE a genre`, (done) => {
			const defaultGenre = TEST_CONSTANTS.GENRES_TEST.CREATE_GENRE;
			const genre = new Genre(defaultGenre);
			genre.save();
			request(app)
				.delete(`/api/genres/${genre._id}`)
				.expect(200)
				.expect('OK')
				.end(done);
		});
	});
});
