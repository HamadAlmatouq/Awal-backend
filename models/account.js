const { model, Schema, Types } = require('mongoose');

const AccountSchema = new Schema({
    owner: { type: Types.ObjectId, refPath: 'ownerModel', required: true },
    ownerModel: { type: String, required: true, enum: ['Parent', 'Kid'] },
    balance: { type: Number, default: 0 },
    accountType: { type: String, required: true, enum: ['Savings', 'regular'] }
});

module.exports = model('Account', AccountSchema);