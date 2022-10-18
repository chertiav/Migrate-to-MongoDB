require('./db/models');
const express = require('express');
const cors = require('cors');
//======================================
const { errorHandlers } = require('./middleware');
const router = require('./routers');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(
	errorHandlers.validationErrorHandler,
	errorHandlers.mongooseErrorHandler,
	errorHandlers.errorHandler,
);

module.exports.app = app;
