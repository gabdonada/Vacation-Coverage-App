const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apiLogs = new Schema({
    datetime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    message:{ 
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    }
})
mongoose.model("apiLogs", apiLogs);