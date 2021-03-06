const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/User");

exports.registerService = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        //  Check if email already used
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            //  Create new User Object
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    //  Save User using mongoose method
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
};

exports.loginService = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
};
