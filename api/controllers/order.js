const mongoose = require('mongoose');

const Order = require('../models/order');


exports.order_delete_by_id = async (req, res) => {
        const result = await Order.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: `Es wurde ${result.deletedCount} Bestellung gelöscht.` 
        })
}

exports.order_get_all = (req, res) => {
    Order.find().then(orderList => {
        res.status(200).json(orderList);
    }, error =>{
        res.status(500).json(error);
    });
}

exports.order_post_add = (req, res) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        date: req.body.date,
        amount: req.body.amount
    });

    order.save().then(order => {
        
        res.status(200).json({message: "Item saved in database!"});
    }, error => {
        console.log(error);
        res.status(500).json(error);
    });
}

exports.order_post_change = async (req, res) => {
    // await Order.updateOne({ _id: req.body._id }) 
    // try {
    //     const test = await Order.updateOne({ _id: req.body._id }, req);      
    //     res.status(200).json({
    //         message: test
    //     })
    // } catch(Error) {
    //     console.log(Error)
    // }
}