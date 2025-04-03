const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


mongoose.connect("mongodb://localhost:27017/").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log(err);
})