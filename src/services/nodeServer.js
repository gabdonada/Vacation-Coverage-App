const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const jsforce = require('jsforce');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const routes = require('../routes/api');
const { userInfo } = require('os');


//Data Base Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/reportingVacation", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log("Mongo Connected...");
}).catch((err)=>{
    console.log("Error when connecting MongoDB: "+err);
})

//SalesForce Connection
const {SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN} = process.env;
const salesForceConnection = new jsforce.Connection({
    LoginUrl: SF_LOGIN_URL
})

salesForceConnection.login(SF_USERNAME, SF_PASSWORD+SF_TOKEN,(err, userInfo)=>{
    if(err){
        console.error(err);
    }else{
        console.log("my user id: "+userInfo.id)
    }
}).then((res, req)=>{

}).catch((err)=>{
    console.log("Error in Sales Force auth process: "+err);
})


// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Allowing different domains to request data from localhost:4000/
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);


app.listen(4000, console.log(`Mongo connection is starting at localhost: ${PORT}`));