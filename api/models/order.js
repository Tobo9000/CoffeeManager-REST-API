const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    lastname: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    comment: {
        type: String,
        minlength: 2,
        maxlength: 150
    },
    amount: {
        type: Number,
        min: 1,
        max: 9999
    } 
}); 

module.exports = mongoose.model("Order", orderSchema);