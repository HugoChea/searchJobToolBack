const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const JobSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
    },
    stack: {
        type: String,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    },
    contact: {
        type: String,
    },
    status: {
        type: Number,
        default: 0,
    },
    comment: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = Job = mongoose.model("jobs", JobSchema);
