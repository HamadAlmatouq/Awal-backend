const { model, Schema } = require('mongoose');

const ParentSchema = new Schema({
    Pname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, default: 1400 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, default: 'parent' } 
});

module.exports = model('Parent', ParentSchema);