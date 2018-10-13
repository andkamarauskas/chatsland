'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chat = require('../models/Chat');

const ChannelSchema = mongoose.Schema({
	// chat_id: { type: String, required: true },
	chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
	name: { type: String, required: true },
	description: { type: String },
	tags: [{ type: String, required: true }],
});

const Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel;
