const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateJobInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.position = !isEmpty(data.position) ? data.position : "";
    
    // Name checks
    if (Validator.isEmpty(data.position)) {
        errors.name = "Position is required";
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
