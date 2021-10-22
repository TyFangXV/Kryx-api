require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

//middleware
const authIddleware = require("./middleware/auth");

//initialization
const app = express();
mongoose.connect(process.env.mongoUrl, {useNewUrlParser : true, useUnifiedTopology : true}).then(()=> console.log("db connected")).catch((Err)=> console.log(Err.message))


//configuration && middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/auth", authIddleware);


app.get("/", (req, res)=>{
    res.send("ur gey")
})



app.listen(8080, ()=> console.log("up up"))