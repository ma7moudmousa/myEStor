const express = require('express');
const SubCategory = require('../models/sub_cate');
const Category = require('../models/category');
const authMiddleWare = require('../middleware/auth');
const isAdminMidleWare = require('../middleware/isAdmin');
const router = express.Router();
router.post('/', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        let newCate = await Category.findOne({ 'name': req.body.name });
        if (newCate) {
            res.send({ message: "name category is already exist" });
        } else {
            newCate = new Category({
                name: req.body.name
                , userId: req.user.id
            })
            const result = await newCate.save();
            res.send(result);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.get('/', async (req, res) => {
    try {
        const allCate = await Category.find();
        res.send(allCate);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const matchCate = await Category.findOne({ '_id': req.params.id });
        if (matchCate) {
            res.send(matchCate)
        }
        else {
            res.status(404).send({ message: "not found" });
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.put('/:id', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        const checkName = await Category.find({ 'name': req.body.name });
        if (checkName.length == 1) {
            res.send({ message: "name category is already exist" })
        } else {
            const matchCate = await Category.findById(req.params.id);
            matchCate.name = req.body.name;
            const result = await matchCate.save();
            res.send(result);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/:id', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        const findSub = await SubCategory.findOne({ 'category': req.params.id });
        if (findSub) {
            res.send({ message: "cant do that it is has his subs" })
        }
        else {
            const matchCate = await Category.findByIdAndDelete(req.params.id);
            res.send(matchCate);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports = router;