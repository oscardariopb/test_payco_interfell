const mongoose = require('mongoose');
const {purchaseSchema} = require("../schemas");

const PurchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = PurchaseModel;