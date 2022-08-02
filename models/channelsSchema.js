const mongoose = require('mongoose');

const channelsSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    author: { type: String },
});

const model = mongoose.model('Channels', channelsSchema);

module.exports = model;