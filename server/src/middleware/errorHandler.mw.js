const { Error } = require('mongoose');
const { ValidationError } = require('yup');

module.exports.validationErrorHandler = (err, req, res, next) => {
	if (err instanceof ValidationError) {
		return res.status(422).send({
			errors: [{ title: 'Validation Error', details: err.errors }],
		});
	}
	next(err);
};
module.exports.mongooseErrorHandler = (err, req, res, next) => {
	if (err instanceof Error) {
		return res.status(500).send({
			errors: [{ title: 'Mongoose Error', details: err.errors }],
		});
	}
	next(err);
};
module.exports.errorHandler = (err, req, res, next) => {
	if (res.headerSent) return;
	res.status(err?.status ?? 500).send({
		errors: [{ title: err?.message ?? 'Internal server error' }],
	});
};
