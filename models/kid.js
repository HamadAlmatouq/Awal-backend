const { model, Schema } = require('mongoose');


const KidSchema = new Schema({
    Kname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    civilID: { type: String, required: true },
    mobile: { type: String, required: true },
    savings : { type: Number, default: 0},
    balance : { type: Number, default: 0},
    Pname: { type: String},
    parent: { type: Schema.Types.ObjectId, ref: 'Parent' }, 
    
});

module.exports = model('Kid', KidSchema);