const { model, Schema, Types } = require('mongoose');

const TransferSchema = new Schema({
    fromParent: { type: Types.ObjectId, ref: 'Parent', required: true },
    toKid: { type: Types.ObjectId, ref: 'Kid', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = model('Transfer', TransferSchema);