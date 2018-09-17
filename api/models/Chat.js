const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	name: { type: String, unique: true, required: true },
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
