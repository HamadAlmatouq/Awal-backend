const { model, Schema, Types } = require('mongoose');

const GoalSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    image: { type: String},
    endDate: { type: Date, required: true },
    status: { type: String, required: true, default: 'pending' },
    Kname: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'Parent', required: true },
    kid: { type: Types.ObjectId, ref: 'Kid', required: true }
    
});

module.exports = model('Goal', GoalSchema);