'use strict';

const Chat = require('../models/Chat');

const getAllChats = (req, res) => {
	Chat.find({}, 'id name channels')
		.populate({ path: 'cahnnels', select: 'name' })
		.exec((error, chats) => {
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
				error: err.code === 11000 ? 'chat already exist' : err.message,
			});

		return res.status(200).send({
			message: 'New chat added',
			chat_id: newChat._id,
		});
	});
};

const getOneChat = (req, res) => {
	Chat.findById(req.swagger.params.id.value, (err, chat) => {
		if (err) return res.status(400).send({ message: 'Chat not found' });
		return res.send(chat);
	});
};

const updateChat = (req, res) => {
	Chat.findByIdAndUpdate(
		req.swagger.params.id.value,
		{ $set: req.body },
		(err, chat) => {
			if (err)
				return res.status(400).send({
					error:
						err.code === 11000 ? 'chat already exist' : err.message,
				});
			return res.send({ message: 'Updated' });
		},
	);
};

const deleteChat = (req, res) => {
	Chat.findByIdAndRemove(req.swagger.params.id.value, error => {
		if (error) return res.status(400).send(error);
		return res.send('Deleted');
	});
};

module.exports = {
	getAllChats,
	addNewChat,
	getOneChat,
	updateChat,
	deleteChat,
};
