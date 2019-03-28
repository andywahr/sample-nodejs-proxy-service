
const mongoose = require('mongoose');
const { schema } = require('./schema');
const Proxy = mongoose.model('Proxy', schema);
module.exports = { Proxy };