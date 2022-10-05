const { paginationSchema } = require('../utils/validationSchema');

module.exports.pagination = async (req, res, next) => {
	const { page, result } = req.query;
	const defaultPagionation = {
		limit: 5,
		skip: 0,
	};
	const pagination = {
		limit: result ?? 5,
		skip: (page - 1) * result || 0,
	};
	try {
		if (await paginationSchema.isValid(pagination)) {
			req.pagination = pagination;
		} else {
			req.pagination = defaultPagionation;
		}
		next();
	} catch (error) {
		next(error);
	}
};
