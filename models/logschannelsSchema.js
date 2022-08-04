const mongoose = require('mongoose');

const logschannelsSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    author: { type: String },
});

const model = mongoose.model('LogsChannels', logschannelsSchema);

module.exports = model;