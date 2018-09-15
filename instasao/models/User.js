var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true }
})
module.exports = mongoose.model('User', UserSchema);