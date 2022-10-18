const request = require('supertest');
const { assert } = require('chai');
//================================================
const { books: Book, shelves: Shelf } = require('../../db/models');
const { app } = require('../../app');
const TEST_CONSTANTS = require('./constants-test');

describe('bookControllers testing', () => {
	beforeEach((done) => {
		Book.deleteMany({}, (err) => {
			done();
		});
	});
	afterEach((done) => {
		Book.deleteMany({}, (err) => {
			done();
		});
	});
	describe('getBooks', () => {
		const limit = Math.round(Math.random() * 5) || 5;
		it(`it should GET ${limit} books`, (done) => {
			Book.insertMany(TEST_CONSTANTS.BOOKS_TEST.GET_BOOKS);
			request(app)
				.get(`/api/books?page=1&result=${limit}`)
				.expect(200)
				.expect((res) => {
					const result = [];
					const expectedResult = TEST_CONSTANTS.BOOKS_TEST.GET_BOOKS.sort(
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

	describe('getOneBook', () => {
		before((done) => {
			Shelf.deleteMany({}, (err) => {
				done();
			});
		});
		after((done) => {
			Shelf.deleteMany({}, (err) => {
				done();
			});
		});
		it(`it should GET one book by Id`, (done) => {
			const shelfDefault = new Shelf(
				TEST_CONSTANTS.BOOKS_TEST.GET_ONE_BOOK.SHELVES,
			);
			const expectedResult = TEST_CONSTANTS.BOOKS_TEST.GET_ONE_BOOK.BOOK;
			const bookAddShelf = {
				...expectedResult,
				shelf_id: shelfDefault._id,
			};
			const book = new Book(bookAddShelf);
			shelfDefault.save();
			book.save();
			request(app)
				.get(`/api/books/${book._id}`)
				.expect(200)
				.expect((res) => {
					const [result] = res.body;
					const { _id, __v, shelf, ...resultBook } = result;
					const [shelfREsult] = shelf;
					assert.lengthOf(res.body, 1);
					assert.isObject(result);
					assert.deepEqual(expectedResult, resultBook);
					assert.deepEqual(shelfDefault.code, shelfREsult.code);
				})
				.end(done);
		});
	});

	describe('createBook', () => {
		it(`it should POST a book`, (done) => {
			const expectedResult = TEST_CONSTANTS.BOOKS_TEST.CREATE_BOOK;
			request(app)
				.post('/api/books')
				.send(expectedResult)
				.expect(200)
				.expect((res) => {
					const { _id, __v, ...result } = res.body;
					assert.deepEqual(expectedResult, result);
				})
				.end(done);
		});
	});

	describe('updateBook', () => {
		it(`it should PUT a book`, (done) => {
			const book = new Book(TEST_CONSTANTS.BOOKS_TEST.CREATE_BOOK);
			book.save();
			expectedResult = TEST_CONSTANTS.BOOKS_TEST.UPDATE_BOOK;
			updatedBook = { ...expectedResult, id: book._id };
			request(app)
				.put('/api/books')
				.send(updatedBook)
				.expect(200)
				.expect((res) => {
					const { _id, __v, ...result } = res.body;
					assert.deepEqual(expectedResult, result);
				})
				.end(done);
		});
	});

	describe('changeBook', () => {
		it(`it should PATCH a book`, (done) => {
			const changeBookProperties = TEST_CONSTANTS.BOOKS_TEST.PATCH_BOOK;
			const defaultBook = TEST_CONSTANTS.BOOKS_TEST.CREATE_BOOK;
			const book = new Book(defaultBook);
			book.save();
			const expectedResult = {
				...defaultBook,
				description: changeBookProperties.description,
			};
			request(app)
				.patch(`/api/books/${book._id}`)
				.send(changeBookProperties)
				.expect(200)
				.expect((res) => {
					const { _id, __v, ...result } = res.body;
					assert.deepEqual(expectedResult, result);
				})
				.end(done);
		});
	});

	describe('deleteBook', () => {
		it(`it should DELETE a book`, (done) => {
			const defaultBook = TEST_CONSTANTS.BOOKS_TEST.CREATE_BOOK;
			const book = new Book(defaultBook);
			book.save();
			request(app)
				.delete(`/api/books/${book._id}`)
				.expect(200)
				.expect('OK')
				.end(done);
		});
	});
});
