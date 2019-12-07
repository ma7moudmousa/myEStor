const express = require('express');
const User = require('../models/user');
const bycrpt = require('bcrypt');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const check = await User.findOne({ 'email': req.body.email });
        if (check) {
            const compare = await bycrpt.compare(req.body.password, check.password);
            if (compare) {
                const token = check.genToken();
                res.header("x-auth-token", token).send({ message: "u r logged in efrah ya ma3lm ^_^", token: token });
            } else {
                res.status(404).send({ message: "invalid email or password" });
            }
        } else {
            res.status(400).send({ message: "invalid email or password" });
        }
    } catch (error) {
        res.status(400).send(error.message);
        console.log({ message: "catch error" })
    }
})
module.exports = router;