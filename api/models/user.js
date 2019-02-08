const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minlength: 7,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: false,
        minlength: 8,
        required: true
    } 
});

module.exports = mongoose.model("User", userSchema);
