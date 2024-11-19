const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    idSesion: {type: String, required: true},
    token: {type: String, required: true},
    valorCompra: {type: Number, required: true},
    estado: {type: String, required: true},
    documento: {type: String, required: true},
    producto: {type: String, required: true},
});

module.exports = purchaseSchema;