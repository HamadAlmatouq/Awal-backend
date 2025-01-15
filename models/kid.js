const { model, Schema } = require('mongoose');


const KidSchema = new Schema({
    Kname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    civilID: { type: String, required: true },
    mobile: { type: String, required: true },
    parentName: { type: String},
    parent: { type: Schema.Types.ObjectId, ref: 'Parent' }, 
    
});

module.exports = model('Kid', KidSchema);