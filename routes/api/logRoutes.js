// Imports

const express = require("express")

const router = express.Router()

const Log = require("../../logSchema")


router 
.route("/")
.post((req,res)=>{
    const newEntry = req.body
    Log.create([newEntry], (err, log)=>{
if (err){
    res.status(400).json({msg: err.message})
} else {
    res.status(201).json({log})
}
console.log("Route to create new entry was run")
    })
})










module.exports = router