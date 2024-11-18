const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    documento: { type: String, required: true },
    email: { type: String, required: true },
    celular: { type: String, required: true },
});

module.exports = clientSchema;