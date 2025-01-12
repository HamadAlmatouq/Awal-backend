const { model, Schema, Types } = require('mongoose');

const GoalSchema = new Schema({
  kidId: { type: Types.ObjectId, ref: 'Kid', required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  achieved: { type: Boolean, default: false }
});

module.exports = model('Goal', GoalSchema);