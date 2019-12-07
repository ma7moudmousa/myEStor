const bcrypt = require('bcrypt');
const authMiddleWare = require('../middleware/auth');
const isAdminMidleWare = require('../middleware/isAdmin');
const express = require('express');
const User = require('../models/user');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        let newUser = await User.findOne({ 'email': req.body.email });
        if (newUser) {
            res.send({ message: "that email is aleady exist" });
        }
        else {
            try {
                newUser = new User({
                    firstName: req.body.firstName
                    , lastName: req.body.lastName
                    , address: req.body.address
                    , email: req.body.email
                    , phoneNum: req.body.phoneNum
                    , password: req.body.password
                })
                const hash = await bcrypt.hash(newUser.password, 10);
                newUser.password = hash;
                const result = await newUser.save();
                const token = result.genToken();
                res.header("x-auth-token", token).send({ message: "congratulation sir", token: token });
            } catch (error) {
                res.status(400).send(error.message)
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.get('/me', authMiddleWare, async (req, res) => {
    try {
        const my_profile = await User.findById(req.user.id).select('-password');
        res.send(my_profile);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.get('/', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        const allUser = await User.find().select('-password');
        res.send(allUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.put('/:id', [authMiddleWare], async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            isAdmin: req.body.isadmin
        }, { new: true })

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/:id', [authMiddleWare], async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports = router;