const { model, Schema , Types} = require('mongoose');

const ParentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    account: { type: Types.ObjectId, ref: 'Account', required: true } // Reference to Account model
    
});

module.exports = model('Parent', ParentSchema);