const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    documento: {type: String, required: true},
    celular: {type: String, required: true},
    saldo: { type: Number, required: true },
});

module.exports = walletSchema;