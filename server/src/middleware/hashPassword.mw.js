const CONSTANTS = require('../constants/constants');
const bcrypt = require('bcrypt');

module.exports.hashPassword = async (req, res, next) => {
	try {
		req.body.password = await bcrypt.hash(
			req.body.password,
			CONSTANTS.SALT_ROUNDS,
		);
		next();
	} catch (error) {
		next(error);
	}
};
