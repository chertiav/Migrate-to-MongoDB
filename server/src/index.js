require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const env = process.env.NODE_ENV || 'development';
//=====================================
const { errorHandlers } = require('./middleware');
const config = require('./config/mongo-config')[env];
const db = require('./db/models');
const router = require('./routers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(
	errorHandlers.validationErrorHandler,
	errorHandlers.mongooseErrorHandler,
	errorHandlers.errorHandler,
);

app.listen(
	PORT,
	console.log(
		`Server has been started at http://localhost:${PORT}, press Ctrl+C to terminate...`,
	),
);
