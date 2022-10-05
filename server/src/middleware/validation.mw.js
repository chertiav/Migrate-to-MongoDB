const createHttpError = require('http-errors');
//==================================================
const {
	newGenreValidationSchema,
	changeGenreValidationSchema,
	newShelfValidationSchema,
	changeShelfValidationSchema,
	newCustomerValidationSchema,
	changeCustomerValidationSchema,
	newAuthorValidationSchema,
	changeAuthorValidationSchema,
	newRequestValidationSchema,
	changeRequestValidationSchema,
	newBookValidationSchema,
	changeBookValidationSchema,
} = require('../utils/validationSchema');

module.exports.validateNewGenre = async (req, res, next) => {
	const body = req.body;
	try {
		await newGenreValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateChangeGenre = async (req, res, next) => {
	const body = req.body;
	try {
		await changeGenreValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateNewShelf = async (req, res, next) => {
	const body = req.body;
	try {
		await newShelfValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateChangeShelf = async (req, res, next) => {
	const body = req.body;
	try {
		await changeShelfValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateNewCustomer = async (req, res, next) => {
	const body = req.body;
	try {
		await newCustomerValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateChangeCustomer = async (req, res, next) => {
	const body = req.body;
	try {
		await changeCustomerValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateNewAuthor = async (req, res, next) => {
	const body = req.body;
	try {
		await newAuthorValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateChangeAuthor = async (req, res, next) => {
	const body = req.body;
	try {
		await changeAuthorValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateNewRequest = async (req, res, next) => {
	const body = req.body;
	try {
		await newRequestValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateChangeRequest = async (req, res, next) => {
	const body = req.body;
	try {
		await changeRequestValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateNewBook = async (req, res, next) => {
	const body = req.body;
	try {
		await newBookValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
module.exports.validateChangeBook = async (req, res, next) => {
	const body = req.body;
	try {
		await changeBookValidationSchema.validate(body, {
			abortEarly: false,
		});
		next();
	} catch (error) {
		next(error);
	}
};
