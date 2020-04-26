
const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
const router = express.Router();




// get all admins
router.get("/admins" , (req,res)=>{

});


// get admin by specific ID
router.get("/admins/:id", (req,res)=>{

})




// add new admin
router.post( "/admins",  (req,res)=> { 

        Admin.create( req.body , (err , newAdmin)=>{
            console.log(req.body);
            
                if (err) {
                    console.log("Failed Create New Admin");
                    res.status(400).send(err.massage);
                } else {
                    console.log(newAdmin);    
                    res.send(newAdmin);       
                }
        } )
        
 });




module.exports = router;