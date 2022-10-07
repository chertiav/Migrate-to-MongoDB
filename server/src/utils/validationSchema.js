const yup = require('yup');

const TITLE_NAME_SCHEMA = yup
	.string()
	.trim()
	.matches(/^[A-Z,А-Я](\w+\s?)\w/);

const EMAIL_SHEMA = yup
	.string()
	.email('Must be a valid email')
	.trim()
	.matches(/^\w+[\.\-]?\w+@[a-z]{3,8}\.[a-z]{2,5}$/);

module.exports.paginationSchema = yup.object().shape({
	limit: yup.number().min(1).max(5).required(),
	skip: yup.number().required(),
});
module.exports.newGenreValidationSchema = yup.object().shape({
	title: TITLE_NAME_SCHEMA.min(1).required(),
});
module.exports.changeGenreValidationSchema = yup.object().shape({
	title: TITLE_NAME_SCHEMA.min(1),
});
module.exports.newShelfValidationSchema = yup.object().shape({
	code: TITLE_NAME_SCHEMA.min(7).required(),
});
module.exports.changeShelfValidationSchema = yup.object().shape({
	code: TITLE_NAME_SCHEMA.min(7),
});
module.exports.newCustomerValidationSchema = yup.object().shape({
	name: yup.string().required().min(1),
	email: EMAIL_SHEMA.required(),
	birthday: yup.date(),
	address: yup.object().shape({
		country: yup.string().min(3),
		city: yup.string().min(3),
		street: yup.string().min(1),
		building: yup.string().min(1),
		app: yup.number(),
		zipcode: yup.string().min(1),
	}),
	phone: yup.object().shape({
		home: yup.string().min(10),
		office: yup.string().min(10),
	}),
	description: yup.string(),
	password: yup.string().required().min(1),
});
module.exports.changeCustomerValidationSchema = yup.object().shape({
	name: yup.string().min(1),
	email: EMAIL_SHEMA,
	birthday: yup.date(),
	address: yup.object().shape({
		country: yup.string().min(3),
		city: yup.string().min(3),
		street: yup.string().min(1),
		building: yup.string().min(1),
		app: yup.number(),
		zipcode: yup.string().min(1),
	}),
	phone: yup.object().shape({
		home: yup.string().min(10),
		office: yup.string().min(10),
	}),
	description: yup.string(),
	password: yup.string().min(1),
});
module.exports.newAuthorValidationSchema = yup.object().shape({
	name: yup.string().required().min(1),
	email: EMAIL_SHEMA.required(),
	birthday: yup.date(),
	death: yup.date(),
	books: yup.array().of(yup.string()),
	description: yup.string(),
});
module.exports.changeAuthorValidationSchema = yup.object().shape({
	name: yup.string().min(1),
	email: EMAIL_SHEMA,
	birthday: yup.date(),
	death: yup.date(),
	books: yup.array().of(yup.string()),
	description: yup.string(),
});
module.exports.newRequestValidationSchema = yup.object().shape({
	code: yup.string().required().min(1),
	date: yup.date().required(),
	customer_id: yup.string().required(),
	books: yup.array().of(yup.string()),
	description: yup.string(),
});
module.exports.changeRequestValidationSchema = yup.object().shape({
	code: yup.string().min(1),
	date: yup.date(),
	customer_id: yup.string(),
	books: yup.array().of(yup.string()),
	description: yup.string(),
});
module.exports.newBookValidationSchema = yup.object().shape({
	title: TITLE_NAME_SCHEMA.min(1).required(),
	genres: yup.array().of(yup.string()),
	shelf_id: yup.string().required(),
	image: yup.string().url(),
	authors: yup.array().of(yup.string()),
	requests: yup.array().of(yup.string()),
	description: yup.string(),
});
module.exports.changeBookValidationSchema = yup.object().shape({
	title: TITLE_NAME_SCHEMA.min(1),
	genres: yup.array().of(yup.string()),
	shelf_id: yup.string(),
	image: yup.string().url(),
	authors: yup.array().of(yup.string()),
	requests: yup.array().of(yup.string()),
	description: yup.string(),
});
