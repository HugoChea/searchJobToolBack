const express = require("express");
const router = express.Router();

const { getJobList, addJob, updateJob } = require('../../controllers/jobController')

// @route GET api/jobs/
// @desc get all job
// @access Public
router.get("/", getJobList)

// @route POST api/jobs/add
// @desc New job
// @access Token Bearer
router.post("/add", addJob)

// @route POST api/jobs/add
// @desc New job
// @access Public
router.put("/:id", updateJob)

module.exports = router;
