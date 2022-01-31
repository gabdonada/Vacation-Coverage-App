const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jsforce = require('jsforce');
const { userInfo } = require('os');

require('dotenv').config();

require('../models/coverageList');
const converageList = mongoose.model("CoverageList");

//API Get Coverage roter "Localhost:port/api/getCoverage" returns you an JSON with Coverages that are active
router.get('/getCoverage', (req, res) =>{
    converageList.find({hasfineshed: false}).then((data)=>{
        const today = new Date();
        let arrayToSendToPage = []
        for(const coverage of data){
            if(coverage.enddate > today){
                arrayToSendToPage.push(coverage);
            }
        }
        res.json(arrayToSendToPage);
        
    }).catch((err)=>{
        console.log("Error when extracting data: "+err);
    })
})




router.post('/save', (req, res)=>{
    //console.log("Fighter is here")
    const newCover = {
        underCover: req.body.employeeOnVacation,
        convering: req.body.employeellCovering,
        startdate: req.body.periodstartDate,
        enddate: req.body.periodendDate
    }

    new converageList(newCover).save().then(()=>{
        console.log("Saved successfully");
        
    }).catch((err)=>{
        console.log("Error saving the coverage: "+err);
    })
})



router.post('/update/:id', (req, res)=>{
    converageList.findOne({_id: req.params.id}).then((coverage)=>{
        coverage.hasfineshed = true

        coverage.save().then(()=>{
            console.log("Coverage updated");
        }).catch((err)=>{
            console.log("Error saving the update: "+err);
        })
    }).catch((err)=>{
        console.log("Error in the update process: "+err);
    })
})

router.get('/getSalesForce', (req, res)=>{
    const {SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN} = process.env

    const conn = new jsforce.Connection({
        loginUrl: SF_LOGIN_URL
    })

    conn.login(SF_USERNAME, SF_PASSWORD+SF_TOKEN, (err, userInfo)=>{
        if(err){
            console.log("Error when login salesForce: "+ err);
        }else{
            console.log(userInfo)
        }
    });

})

module.exports = router