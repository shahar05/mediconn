
const express = require("express");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
const router = express.Router();


// add new admin
router.post( "/admin",  (req,res)=> { 

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