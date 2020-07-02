const db = require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var schema = db.Schema({
    p_name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true },
    deases: { type: String, require: true },
    age: { type: Number, require: true},
    gender: { type: String, require: true},
    medicine: { type: String, require: true},
    obj_id: { type: Schema.Types.ObjectId, ref: 'user' }
});
// compilation of schema 
module.exports = db.model('medicinedata', schema, 'medicine')