const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateJobInput = require("../../controllers/job");
// Load User model
const Job = require("../../models/Job");

// @route GET api/jobs/
// @desc get all job
// @access Public
router.get("/", (req, res) => {
    Job.find({ author: req.body.author }).then((jobs) => {
        res.json(jobs);
    });
});

// @route POST api/jobs/add
// @desc New job
// @access Public
router.post("/add", (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newJob = new Job({
        author: req.body.author,
        name: req.body.name,
        position: req.body.position,
        stack: req.body.stack,
        description: req.body.description,
        link: req.body.link,
        contact: req.body.contact,
        comment: req.body.comment,
    });

    newJob
        .save()
        .then((job) => res.json(job))
        .catch((err) => console.log(err));
});

// @route POST api/jobs/add
// @desc New job
// @access Public
router.put("/:id", (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const id = req.params.id;

    Job.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((job) => {
            if (!job) {
                res.status(404).json("not found");
            } else {
                res.json(job);
            }
        })
        .catch((err) => console.log(err));
});

module.exports = router;
