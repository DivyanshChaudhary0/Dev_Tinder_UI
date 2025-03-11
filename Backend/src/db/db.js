
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/devTinder")
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log("db not connected");
})
