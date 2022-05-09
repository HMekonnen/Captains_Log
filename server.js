// Import Express
const express = require("express")


// Import Morgan
const morgan = require("morgan")

//const mongoConfig = require("./config")

// Import Log Schema
const Log = require("./logSchema")


// Import router file
const logRoutes = require("./routes/api/logRoutes")

const mongoConfig = require("./config")

//Config
require("dotenv").config()


//Create PORT
const PORT = process.env.PORT || 3000



//Initialize express
const server = express()


// Body Parser MiddleWare
server.use(express.json())

// Dev Morgan
server.use(morgan("dev"))

// M.W to allow handling of form submissions- Devin uses-> app.use express.static static("public") - Look it up. 
 //server.use(express.urlencoded({extended:false}))

// Connect server.js w/ log routes file & Log Schema
server.use('/', logRoutes);

server.use('/', Log)

// Homepage "welcome"
server.get('/home',(req,res)=>{
    res.status(200).json({message: 'Welcome to the the Captains Log!'});
})



// Listen at PORT
server.listen(PORT, ()=>{
    mongoConfig()
console.log(` Server is listening at port: ${PORT}`)
})
