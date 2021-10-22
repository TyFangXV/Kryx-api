const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    sessionToken : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model("user", UserSchema);