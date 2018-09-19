'use strict';

require('dotenv').load();

const mongoose = require('mongoose');

const SwaggerExpress = require('swagger-express-mw');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

mongoose.set('useCreateIndex', true);
mongoose
	.connect(
		process.env.MONGO_DB,
		{ useNewUrlParser: true }
	)
	.catch(err => {
		console.log('Could not connect to MongoDB.', err);
		process.exit();
	});

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

	const port = process.env.PORT || 3000;
	console.log('Works on port: ', port);
	app.listen(port);
});
