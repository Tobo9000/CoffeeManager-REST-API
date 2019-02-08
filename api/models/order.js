const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {
        type: String,
        minlength: 2,
        maxlength: 150
    },
    amount: {
        type: Number,
        min: 1,
        max: 9999,
        required: true
    },
    date : {
        type: Date,
        require: true
    } 
}); 

module.exports = mongoose.model("Order", orderSchema);