const bcrypt = require('bcryptjs')
const conn = require('../config/config.json');
var db = require('../models/user')
var db_product = require('../models/product')
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose')


// Delete the user by the user ID

exports.delete_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {
        db.deleteOne({ email: data.email }, function(err, doc) {

            if (doc.deletedCount === 0) {

                res.json({
                    sucess: false,
                    message: "User Not Found",
                    data: data,
                })

            } else {
                res.json({
                    sucess: true,
                    message: "User Deleted successfull",
                    data: [""]
                })
            }
        })
    })

}


// Update the user to the user Id and upgrade the details 

exports.update_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, data) => {

        var content = req.body;
        db.findOneAndUpdate({ _id: data.id }, content, { new: true }, function(err, doc) {
            var databa = {
                f_name: data.firstName,
                l_name: data.lastName,
                email: data.email
            }
            if (doc === null) {

                return res.json({
                    sucess: false,
                    message: "User not Exist"
                })

            } else {
                return res.json({
                    sucess: true,
                    message: "User Updated Successfully",
                    data: databa
                })

            }
        });

    })


}



// Get the user through the id

exports.get_user = (req, res) => {
    var currentuser = req.headers.authorization;

    jwt.verify(currentuser, conn[1].key, (err, datab) => {
        db.findOne({ email: datab.email }, function(err, data) {
            var databb = {
                f_name: data.f_name,
                l_name: data.l_name,
                email: data.email
            }

            if (data === null) {

                return res.json({
                    sucess: false,
                    message: "User Not Exist",
                    data: [""]
                })

            } else {
                return res.json({
                    sucess: true,
                    message: "Users Get Successfully ",
                    data: databb
                })

            }
        });
    })



}