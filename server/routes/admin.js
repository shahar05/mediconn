
const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
const router = express.Router();




// get all admins
router.get("/admins" , (req,res)=>{
    Admin.find({}, (err, admins)=>{
        if (err || !admins) {
            res.status(404).send("no admins found");
            
        } else {
            res.send(admins);
        }

    })

});


// get admin by specific ID
router.get("/admins/:id", (req,res)=>{

})

// update specifice Amdmin 
router.put("/admins" , (req,res)=>{

})

router.delete("/admins" , (req,res)=>{
    
})

// add new admin
router.post( "/admins",  (req,res)=> { 

        Admin.create( req.body , (err , newAdmin)=>{
            console.log(req.body);
            
                if (err) {
                    console.log("Failed Create New Admin");
                    console.log(err);
                    res.status(400).send(err.message);
                } else {
                    console.log(newAdmin);    
                    res.send(newAdmin);       
                }
        } )
        
 });




module.exports = router;