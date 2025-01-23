const { model, Schema, models } = require('mongoose');
const PasswordManager = require('../helpers/PasswordManager');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'parent' },
    parent: { type: Schema.Types.ObjectId, ref: 'Parent' },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await PasswordManager.toHash(this.get("password"));
    }
    next();
});

module.exports = models.User || model('User', UserSchema);