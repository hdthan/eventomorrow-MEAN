/*jslint esversion: 6*/
/*jslint node: true */
"use strict";

let mongoose = require('mongoose');


//article schema

let articleSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    }
});

let Article = module.exports = mongoose.model('customers',articleSchema);