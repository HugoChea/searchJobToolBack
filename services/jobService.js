// Load User model
const Job = require("../models/Job");

exports.getJobListService = (req, res) => {
    Job.find({ author: req.query.author }).then((jobs) => {
        res.json(jobs);
    });
};

exports.addJobService = (req, res) => {
    //  Create Job Object
    const newJob = new Job({
        company: req.body.company,
        author: req.body.author,
        name: req.body.name,
        position: req.body.position,
        stack: req.body.stack,
        description: req.body.description,
        link: req.body.link,
        contact: req.body.contact,
        comment: req.body.comment,
        status: req.body.status,
    });

    //  Save the new Job Object using mongoose method
    newJob
        .save()
        .then((job) => {
            response = {
                body: job,
                status: 200,
            };
            res.json(response);
        })
        .catch((err) => console.log(err));
};

exports.updateJobService = (req, res) => {
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
};
