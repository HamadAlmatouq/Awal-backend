const { model, Schema, Types } = require('mongoose');

const TaskSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: { type: Number, required: true }, 
    parent: { type: Types.ObjectId, ref: 'Parent', required: true }, 
    kid: { type: Types.ObjectId, ref: 'Kid', required: true } 
});

module.exports = model('Task', TaskSchema);