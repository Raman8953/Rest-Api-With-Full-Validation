// Require the product schema to add product details
var db_medicine = require('../models/medicine')
var db = require('../models/user');
    // require the config file that pass database url to the user
const conn = require('../config/config.json');

// require it to create TOKEN to perform sign and verify operation 
var jwt = require('jsonwebtoken')

// It methods are used to create the product according to user
exports.create_medicine = (req, res) => {
    var content = req.body;

    // verify teh token to the user headers authorization
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {

        // store the value of user data that are show on response
        var datass = {
                f_name: data.firstName,
                l_name: data.lastName,
                email: data.email
            }
            // create an object and store the value into the schema
        var obj = new db_medicine({
                p_name: content.p_name,
                email: content.email,
                deases: content.deases,
                age: content.age,
                gender: content.gender,
                medicine: content.medicine,
                obj_id: data.id
            })
            // variable that can send through the response of the data
            // save the data into the product schema
        obj.save((err, data) => {
            var datab = {
                p_name: content.p_name,
                email: content.p_desc,
                deases: content.deases,
                age: content.age,
                gender: content.gender,
                medicine: content.medicine,
                p_id: data._id,
                user: datass
            }
            if (!err) {
                res.json({
                    sucess: true,
                    message: "Medicine Add Successfully",
                    data: datab
                })
            } else { res.send(err) }
        })
    })

}




// delete the product according to its Id

exports.delete_medicine = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var m_id = req.params.id
            // here deleteone command are used to delete the product according to its product id
        db_medicine.deleteOne({ _id: m_id }, (err, doc) => {
            if (doc.deletedCount === 0) {
                return res.json({
                    sucess: false,
                    message: "Medicine Not Found"
                });
            } else {
                return res.json({
                    sucess: true,
                    message: "Medicine Deleted",
                    data: [""]
                })
            }
        })
    })
}



// update the product record according to product id

exports.update_medicine = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        var datass = {
            f_name: data.firstName,
            l_name: data.lastName,
            email: data.email
        }
        var med_id = req.params.id
        var content = req.body;
        db_medicine.findOneAndUpdate({ _id: med_id }, content, { new: true }, (err, doc) => {
            var datab = {
                m_id: med_id,
                p_name: content.p_name,
                email: content.p_desc,
                deases: content.deases,
                age: content.age,
                gender: content.gender,
                medicine: content.medicine,
                user: datass
            }
            if (doc == null) {

                return res.json({
                    sucess: false,
                    message: "Medicine Id Not Matched"
                })

            } else {
                res.json({
                    success: true,
                    message: "Medicine Updated Successfully",
                    data: datab
                })

            }
        })
    });

}


// Show the product of the user

exports.get_medicine_by_id = (req, res) => {
    jwt.verify(req.headers.authorization, conn[1].key, (err, data) => {
        db_medicine.find({ _id: req.params.id }, function(err, story) {
                res.send(story)
        });
    })
}

exports.get_medicine = (req, res) => {
    var currentuser = req.headers.authorization;
    jwt.verify(currentuser, conn[1].key, (err, datab) => {
        db.find({ _id: req.params.id }, function(err, story) {
            if (story === null){
                return res.json({
                    sucess: false,
                    message: "User Not Exist",
                    data: [""]
                })
            }
            else{
                var uid = story[0].obj_id;
                db_medicine.find({uid}, function(err, data) {
                    datass = data.toString();
                if (data === null) {
                    return res.json({
                        sucess: false,
                        message: "Medicine Not Exist",
                        data: [""]
                    })
    
                } else {
                    db_medicine.findOne({})
                    return res.json({
                        sucess: true,
                        message: "Medicine Get Successfully ",
                        data: data
                    })
    
                }
            });
            }
            
    })
    })

}
// exports.get_medicine = (req, res) => {
//     var currentuser = req.headers.authorization;
//     jwt.verify(currentuser, conn[1].key, (err, datab) => {
//         db.find({ _id: req.params.id }, function(err, story) {
//             if (story === null){
//                 return res.json({
//                     sucess: false,
//                     message: "User Not Exist",
//                     data: [""]
//                 })
//             }
//             else{
//                 var uid = story[0].obj_id;
//                 db_medicine.find({uid}, function(err, data) {
//                 if (data === null) {
//                     return res.json({
//                         sucess: false,
//                         message: "Medicine Not Exist",
//                         data: [""]
//                     })
    
//                 } else {
//                     return res.json({
//                         sucess: true,
//                         message: "Medicine Get Successfully ",
//                         data: data
//                     })
    
//                 }
//             });
//             }
            
//     })
//     })

// }