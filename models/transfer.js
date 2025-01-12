const { model, Schema, Types } = require('mongoose');

const TransferSchema = new Schema({
    fromAccount: { type: Types.ObjectId, ref: 'Account', required: true },
    toAccount: { type: Types.ObjectId, ref: 'Account', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = model('Transfer', TransferSchema);