const { model, Schema, Types } = require('mongoose');

const TaskCompletionRequestSchema = new Schema({
    task: { type: Types.ObjectId, ref: 'Task', required: true },
    kid: { type: Types.ObjectId, ref: 'Kid', required: true },
    parent: { type: Types.ObjectId, ref: 'Parent', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('TaskCompletionRequest', TaskCompletionRequestSchema);