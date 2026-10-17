const mongoose = require('mongoose');
const schema = require('./schema');
const globals = require('./globals');

module.exports = mongoose.model(globals.name.singular, schema);