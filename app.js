'use strict';

require('dotenv').load();

const mongoose = require('mongoose');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

const Chat = require('./api/models/Chat');

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
	res.send('Hello world');
});

app.get('/chat', (req, res) => {
	Chat.find({}, 'id name', (error, chats) => {
		if (error)
			return res.status(400).send({
				message: 'Error getting chats',
				error: error.message,
			});

		return res.status(200).send(chats);
	});
});
app.post('/chat', (req, res) => {
	const newChat = new Chat({
		name: req.body.name,
	});
	newChat.save(err => {
		if (err)
			return res.status(400).send({
				message: 'Error adding new chat',
				error: err.code === 11000 ? 'chat already exist' : err.message,
			});

		return res.status(200).send({
			message: 'New chat added',
			chat_id: newChat._id,
		});
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
