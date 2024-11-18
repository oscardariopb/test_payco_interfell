const mongoose = require('mongoose');
const {walletSchema} = require("../schemas");

const WalletModel = mongoose.model('Wallet', walletSchema);

module.exports = WalletModel;