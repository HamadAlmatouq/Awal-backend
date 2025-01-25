const { model, Schema, Types } = require('mongoose');

const TaskSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: { type: Number, required: true }, // Duration in hours
    remainingDuration: { type: Number, required: true }, // Remaining duration in hours
    startTime: { type: Date, required: true, default: Date.now }, // Start time of the task
    pending: { type: Boolean, required: true, default: true },
    completed: { type: Boolean, required: true, default: false },
    expired: { type: Boolean, required: true, default: false }, // Expired status
    parent: { type: Types.ObjectId, ref: 'Parent', required: true },
    kid: { type: Types.ObjectId, ref: 'Kid', required: true },
});

module.exports = model('Task', TaskSchema);