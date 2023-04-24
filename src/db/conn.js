const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

// creating a database
mongoose.connect("mongodb://localhost:27017/message-db").then(() => {
    console.log("Data base Connected!");
}).catch((err)=>{
    console.log(err);
})