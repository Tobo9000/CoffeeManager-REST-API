const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_PRIVATE_KEY = "&x96s9W~5?";
const JWT_EXPIRATION_TIME = "180 days";

const User = require('../models/user');


exports.user_get_all = (req, res) => {
    User.find().then(userList => {
        res.status(200).json(userList);
    }, error =>{
        res.status(500).json(error);
    });
}

exports.user_post_sign_up = (req, res) => {
    // Add an id for user
    Object.assign(req.body, { _id: new mongoose.Types.ObjectId() })
    const user = new User(req.body);
    // Hash the user's password
    bcrypt.hash(req.body.password, 10, function(error, hash) {
        if(error) {
            console.log(error)
        } else {
            // Set the hash and persist the user in the database  
            user.password = hash;
            user.save().then(user => {
                user = user.toObject();
                delete user.__v;
                delete user.password;
                const token = jwt.sign(user, JWT_PRIVATE_KEY, {expiresIn: JWT_EXPIRATION_TIME});
                res.status(200).json({success: {
                    message: "Registrierung erfolgreich",
                    token: token
                }});
            }, error => {
                res.status(500).json(error);
            })
        }
    });
 }

exports.user_post_login = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        bcrypt.compare(req.body.password, user.password, (error, result) => {
            if(error) {
                res.status(401).json({ error: "Unauthorized" });
            } else {
                user = user.toObject();
                delete user.__v;
                delete user.password;
                const token = jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: JWT_EXPIRATION_TIME });
                res.status(200).json({Success: {message: "Anmeldung erfolgreich.", token: token}});
            }
        });
    }, error => {
        return res.status(500).json(error);
    });
}

 

