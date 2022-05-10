// Imports

const express = require("express")

const router = express.Router()

const Log = require("../../logSchema")

const log = require("../../LogData")


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

/**====================SEED ROUTE - SEEDS DATALOG from LogData.js============================= */

router
.route("/seed")
.get((req,res)=>{
    Log.insertMany(log,(err, logs)=>{
        if(err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json(logs)
        }
        console.log("Seed route was run")
    })
})



/**====================INDEX ROUTE - Displays all content in DB ============================= */

router
.route("/index")
.get((req,res)=>{
    Log.find((err,log)=>{
        if(err){
            res.status(400).json({msg: err.message})
        } else {
            res.status(201).json({log})
        }
        console.log("Index route was run")
    })
})

/**====================INDEX/:ID ROUTE - Search by ID and display result ============================= */

router
.route("/index/:id")
.get((req,res)=>{
    const id= req.params.id
    Log.findById(id,(err, logs)=>{
            if (err){
                res.status(400).json({msg: `The id you entered: ${id} was not found. Please check the ID and try again.`, msg2: err.message})
            } else {
                res.status(200).json(logs)
            }
           
        console.log("Index/:id route was run")
    })
})

/**====================DELETE BY ID -INDEX/:ID ROUTE - Search by ID and DELETE ============================= */

router
.route("/index/:id")
.delete((req,res)=>{
    const id= req.params.id
    Log.findByIdAndDelete(id,(err, logs)=>{
            if (err){
                res.status(400).json({msg: `The id you entered: ${id} was not found. Please check the ID and try again.`, msg2: err.message})
            } else {
                res.status(200).json({display: logs, msg:"Successfully deleted"})
            }
           
        console.log(" Delete by Index/:id route was run")
    })
})

/**===================================================DELETES ALL========================================================================= */

// Delete ALL --> unless parameters specify otherwise    
router
.route("/clear")
.delete((req,res)=>{
 
 Log.deleteMany((err)=>{
    if(err){
        res.status(404).json({message: err.message})
    } else {
        res.status(204).json({msg: 'Data was successfully cleared!'})
    }
   
    console.log("Delete many was run")
})

    })


    /**===================================================SEARCH BY ID AND UPDATE========================================================================= */

        // SEARCHES BY ID AND UPDATE
        router
        .route("/:id")
        .put((req, res)=>{
            const id = req.params.id
            const updatedLog = req.body
            Log.findByIdAndUpdate(id, updatedLog,{new:true},(err, updatedLog)=>{
        if (err){
            res.status(400).json({msg: `No log with the ID of ${id} found. Please check the ID and try again.`, msg2: err.message})
        } else {
            res.status(200).json({msg: `Update Successful`, display: {updatedLog}})
        }
          
        console.log("Search by ID and update was run")
        })
    })





module.exports = router