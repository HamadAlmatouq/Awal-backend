const { model, Schema, Types } = require('mongoose');

const KidSchema = new Schema({
    name: { type: String, required: true },
    steps: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    birthday: { type: Date, required: true },
    civilID: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'Parent', required: true }, // Reference to Parent model
    account: { type: Types.ObjectId, ref: 'Account', required: true } // Reference to Account model
});

module.exports = model('Kid', KidSchema);