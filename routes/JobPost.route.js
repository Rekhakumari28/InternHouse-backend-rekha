const express = require('express')
const router = express.Router()

const { addJobPost, getAllJobPosts, jobByTitle, jobById, jobUpdate, jobDelete } = require('../controller/jobRouter')

router.post("/",addJobPost )
router.get("/", getAllJobPosts)
router.get("/title/:jobTitle", jobByTitle)
router.get("/:JobId", jobById)
router.post("/:JobId", jobUpdate)
router.delete("/:JobId",jobDelete)

module.exports = router