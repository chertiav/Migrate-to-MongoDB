require('dotenv').config();
const http = require('http');
//==============================
const { app } = require('./app');

const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);

httpServer.listen(
	PORT,
	console.log(
		`Server has been started at http://localhost:${PORT}, press Ctrl+C to terminate...`,
	),
);
