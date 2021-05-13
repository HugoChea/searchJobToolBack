const {
    registerService,
    loginService,
} = require("../services/authenticationService");

// a degager
const validateRegisterInput = require("../controllers/register");
const validateLoginInput = require("../controllers/login");

/*
 * call other imported services, or same service but different functions here if you need to
 */
exports.register = (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    return registerService(req, res);
};

exports.login = (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    return loginService(req, res);
};
