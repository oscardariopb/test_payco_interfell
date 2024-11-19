const mongoose = require('mongoose');
const { clientSchema } = require("../schemas");

const ClientModel = mongoose.model('Client', clientSchema);

module.exports = ClientModel;