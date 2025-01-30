const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },    
    jobType: [{
        type: String,
        enum:["Full-time (On-site)","Part-time (On-site)", "Full-time (Remote)" ,"Part-time (Remote)"]
    }],
    jobDescription: {
        type: String,
        required: true
    },
    requireQualifications:{
        type: String,
        required: true
    },
})

const JobPost = mongoose.model("JobPost", jobSchema)
module.exports = JobPost