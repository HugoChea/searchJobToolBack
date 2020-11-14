const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const secret = keys.secretOrKey;
// Load input validation
const validateJobInput = require("../../controllers/job");
// Load User model
const Job = require("../../models/Job");

// @route GET api/jobs/
// @desc get all job
// @access Public
router.get("/", (req, res) => {
    Job.find({ author: req.query.author }).then((jobs) => {
        res.json(jobs)
    })
})

// @route POST api/jobs/add
// @desc New job
// @access Token Bearer
router.post("/add", (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);

    //  Get jwt token from header
    //  Remove Bearer from token and verify if token is valid
    //  If not valid, return 403 reponse = Forbidden 
    bearer = req.headers.authorization.replace(/^Bearer\s/, '')
    jwt.verify(bearer, secret, function(err, decoded) {
        if(err){
            return res.status(403).json(err)
        }
    })

    //  Check if data is valid
    if (!isValid) {
        return res.status(400).json(errors)
    }

    //  Create Job Object
    const newJob = new Job({
        author: req.body.author,
        name: req.body.name,
        position: req.body.position,
        stack: req.body.stack,
        description: req.body.description,
        link: req.body.link,
        contact: req.body.contact,
        comment: req.body.comment,
        status : req.body.status,
    });

    //  Save the new Job Object using mongoose method
    newJob
        .save()
        .then((job) => res.json(job))
        .catch((err) => console.log(err))
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
