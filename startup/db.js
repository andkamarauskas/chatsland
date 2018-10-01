const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
	const db = config.get('db');
	mongoose.set('useCreateIndex', true);
	mongoose
		.connect(
			db,
			{ useNewUrlParser: true }
		)
		.then(() => console.log(`Connected to ${db}`))
		.catch(err => {
			console.log('Could not connect to MongoDB.', err);
			process.exit();
		});
};
