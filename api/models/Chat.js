const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	name: { type: String, unique: true, required: true },
	icon_url: { type: String, unique: true, required: true },
	channels: [{ type: Schema.Types.ObjectId, ref: 'channels' }],
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
