const mongoose = require("mongoose");



const cookie = new mongoose.Schema({
    ip : {
        type : Number,
        required : true
    },
    sessionToken : {
        type : String,
        required : true
    },
    cookie : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model("cookie", cookie);