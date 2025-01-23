const { model, Schema, models } = require('mongoose');

const ParentSchema = new Schema({
    Pname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, default: 1400 },
    role: { type: String, default: 'parent' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = models.Parent || model('Parent', ParentSchema);