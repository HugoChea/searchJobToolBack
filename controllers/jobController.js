const {
    getJobListService,
    addJobService,
    updateJobService
} = require("../services/jobService");

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const secret = keys.secretOrKey;
// Load input validation a degager
const validateJobInput = require("../controllers/job");

/*
 * call other imported services, or same service but different functions here if you need to
 */
exports.getJobList = (req, res) => {
    return getJobListService(req, res);
};

exports.addJob = (req, res) => {
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
        console.log(errors)
        return res.status(400).json(errors)
    }
    return addJobService(req, res);
};

exports.updateJob = (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    return updateJobService(req, res);
};