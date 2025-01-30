const asyncHandler = require("express-async-handler");

const JobPost = require("../models/job.model");

//create jobPost

async function createJobPost(newPost) {
  try {
    const job = new JobPost(newPost);
    const savedJobPost = await job.save();
    return savedJobPost;
  } catch (error) {
    console.log("Error while create job post.", error);
  }
}

const addJobPost = asyncHandler(async (req, res) => {
  try {
    const job = await createJobPost(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to add job post." });
  }
});

// get all job post

async function getAllJobs() {
  try {
    const job = await JobPost.find();
    return job;
  } catch (error) {
    console.log(error);
  }
}

const getAllJobPosts = asyncHandler(async (req, res) => {
  try {
    const job = await getAllJobs();
    if (job.length != 0) {
      res.json(job);
    } else {
      res.status(400).json({ error: "No job post found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job posts." });
  }
});

// find job by title

async function findJobByTitle(jobTitle) {
  try {
    const job = await JobPost.findOne({ jobTitle: jobTitle });
    return job
  } catch (error) {
    console.log(error)
  }
}

const jobByTitle = asyncHandler (async (req, res)=>{
    try {
        const job = await findJobByTitle(req.params.jobTitle)
        if(job.length !=0){
            res.json(job)
        }else{
            res.status(400).json({ error: "No job post found." }); 
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch job posts." });
      }
})

//find by id 

async function findJobById(JobId) {
    try {
      const job = await JobPost.findById(JobId);
      return job
    } catch (error) {
      console.log(error)
    }
  }
  
  const jobById = asyncHandler (async (req, res)=>{
      try {
          const job = await findJobById(req.params.JobId)
          if(job.length !=0){
              res.json(job)
          }else{
              res.status(400).json({ error: "No job post found." }); 
          }
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch job posts." });
        }
  })

// update post by id

async function updatePost(JobId,dataToUpdate) {
    try {
      const job = await JobPost.findByIdAndUpdate(JobId, dataToUpdate);
      return job
    } catch (error) {
      console.log(error)
    }
  }
  
  const jobUpdate = asyncHandler (async (req, res)=>{
      try {
          const job = await updatePost(req.params.JobId, req.body)
          if(job.length !=0){
            res.status(200).json({message: "job is updated successfully.", jobPost: job})
          }else{
              res.status(400).json({ error: "No job post found." }); 
          }
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch job posts." });
        }
  })


// delete job post

async function deletePost(JobId) {
    try {
      const job = await JobPost.findByIdAndDelete(JobId);
      return job
    } catch (error) {
      console.log(error)
    }
  }
  
  const jobDelete = asyncHandler (async (req, res)=>{
      try {
          const job = await deletePost(req.params.JobId)
          if(job){
            res.status(200).json({message: "job is deleted successfully.", jobPost: job})
          }else{
              res.status(400).json({ error: "No job post found." }); 
          }
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch job posts." });
        }
  })

module.exports = { addJobPost, getAllJobPosts, jobByTitle, jobById, jobUpdate, jobDelete };
