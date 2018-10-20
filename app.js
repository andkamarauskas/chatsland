'use strict';

require('dotenv').load();

const SwaggerExpress = require('swagger-express-mw');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

require('./startup/db')();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
	res.redirect('/docs');
});

const config = {
	appRoot: __dirname,
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) {
		throw err;
	}
	swaggerExpress.register(app);
	app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
});

const port = process.env.PORT || 3333;
const server = app.listen(port);
console.log('Works on port: ', port);

module.exports = server;
