const mongoose = require('mongoose');

const wordsSchema = new mongoose.Schema({
	word: { type: String },
	author: { type: String },
});

const model = mongoose.model('Words', wordsSchema);

module.exports = model;