'use strict';

const Channel = require('../models/Channel');

const addNewChannel = (req, res) => {
	const { chat_id, name, description, tags } = req.body;
	const newChannel = new Channel({
		chat: chat_id,
		name,
		description: description ? description : '',
		tags,
	});
	newChannel.save(err => {
		if (err)
			return res.status(400).send({
				error:
					err.code === 11000 ? 'Channel already exist' : err.message,
			});

		return res.status(200).send({
			message: 'New Channel added',
			channel_id: newChannel._id,
		});
	});
};

const getAllChannels = (req, res) => {
	Channel.find({}, 'name description tags')
		.populate({ path: 'chat', select: 'name' })
		.exec((error, channels) => {
			if (error)
				return res.status(400).send({
					message: 'Error getting channels',
					error: error.message,
				});

			return res.status(200).send(channels);
		});
};

const deleteChannel = (req, res) => {
	Channel.findByIdAndRemove(req.swagger.params.id.value, error => {
		if (error) return res.status(400).send(error);
		return res.send('Deleted');
	});
};

// Channel.deleteMany({}, err => console.log(err));
module.exports = {
	addNewChannel,
	getAllChannels,
	deleteChannel,
};
