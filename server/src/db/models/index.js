const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
// =============================================
const config = require('../../config/mongo-config')[env];

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb://${config.host}:${config.port}/${config.dbName}`,
		);
		console.log(
			`Connection has been established successively to ${config.dbName}`,
		);
	} catch (error) {
		console.log(`Unable to connect to the database: ${error.message}`);
	}
};
connectDB();

const dbMongo = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
	.filter((fileName) => {
		return (
			fileName.indexOf('.') !== 0 &&
			fileName !== basename &&
			fileName.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file));
		dbMongo[model.modelName] = model;
	});

dbMongo.mongoose = mongoose;

module.exports = dbMongo;
