'use strict';

const Chat = require('../models/Chat');

const getAllChats = (req, res) => {
	Chat.find({}, 'id name', (error, chats) => {
		if (error)
			return res.status(400).send({
				message: 'Error getting chats',
				error: error.message,
			});

		return res.status(200).send(chats);
	});
};

const addNewChat = (req, res) => {
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
};

module.exports = {
	getAllChats,
	addNewChat,
};
