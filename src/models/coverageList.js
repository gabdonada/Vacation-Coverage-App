const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coverageList = new Schema({
    underCover: {
        type: String,
        required: true
    },
    convering:{ 
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    hasfineshed:{ 
        type: Boolean,
        default: false,
        required: true
    }
})
mongoose.model("CoverageList", coverageList);