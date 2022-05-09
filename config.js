const mongoose = require("mongoose")
require("dotenv").config()


async function main(){
    await mongoose.connect(process.env.MONGODB_URI, ()=>{
        console.log("Connected to Mongo..")
    })
}


  

module.exports = main
