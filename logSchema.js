//import mongoose library
const mongoose = require("mongoose")

// look into why {Router} was used prior. - two birds one stone w/ express + express.Router, maybe?

const express = require("express")
const { Timestamp } = require("bson")
const { time } = require("console")

const router =  express.Router()


//create NEW SCHEMA -- research whether {} is required for both name and image. 
const logSchema = new mongoose.Schema({
    title: {type: String, required: true},
    entry: {type: String, required: true},
    shipIsBroken: {type: Boolean, required: true, default:'true' },

   // N.B circle back regarding timestamps
})




// convert schema to model while declaring it as a separate variable for easy use. Name = Pokie for our Pokemon Schema / model
const Log = mongoose.model("Log", logSchema)

// export model module
module.exports = Log


