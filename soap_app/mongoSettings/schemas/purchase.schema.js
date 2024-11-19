const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    token: { type: String, required: true },
    valorCompra: { type: Number, required: true },
    estado: { type: String, required: true },
    documento: { type: String, required: true },
    producto: { type: String },
});

module.exports = purchaseSchema;