const SubCategory = require('../models/sub_cate');
const Product = require('../models/product');
const authMiddleWare = require('../middleware/auth');
const Catergory = require('../models/category');
const isAdminMidleWare = require('../middleware/isAdmin');
const express = require('express');
const router = express.Router();
router.post('/', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        let newSub = await SubCategory.find({ 'name': req.body.name });
        let check = true;
        if (newSub) {
            for (let i = 0; i < newSub.length; i++) {
                if (newSub[i].category == req.body.category) {
                    res.send({ message: "the name is already exist" });
                    check = false;
                }
            }
            if (check) {
                newSub = new SubCategory({
                    name: req.body.name
                    , category: req.body.category
                })
                const result = await newSub.save();
                const catemother = await Catergory.findById(req.body.category)
                res.send({ new: result, category: catemother })
            }
        } else {
            newSub = new SubCategory({
                name: req.body.name
                , category: req.body.category
            })
            const result = await newSub.save();
            const catemother = await Catergory.findById(req.body.category)
            res.send({ new: result, category: catemother })
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.get('/', async (req, res) => {
    try {
        const allSubs = await SubCategory.find().populate('category');
        res.send(allSubs);
    } catch (error) {
        res.status(400).send(error.message);
    }

})
router.get('/:id', async (req, res) => {
    try {
        const allSubs = await SubCategory.findById(req.params.id).populate('category');
        res.send(allSubs);
    } catch (error) {
        res.status(400).send(error.message);
    }

})
router.put('/:id', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        let newSub = await SubCategory.find({ 'name': req.body.name });
        let check = true;
        if (newSub) {
            for (let i = 0; i < newSub.length; i++) {
                if (newSub[i].category == req.body.category) {
                    res.send({ message: "the name is already exist" });
                    check = false;
                }
            }
            if (check) {
                const updatedSub = await SubCategory.findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    category: req.body.category
                }, { new: true });
                const catemother = await Catergory.findById(req.body.category)
                res.send({ update: updatedSub, category: catemother })
            }
        } else {
            const updatedSub = await SubCategory.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                category: req.body.category
            }, { new: true });
            const catemother = await Catergory.findById(req.body.category)
            res.send({ update: updatedSub, category: catemother })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/:id', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        let deleteSub = await Product.findOne({ 'subcategory': req.params.id });

        if (deleteSub) {
            res.send({ message: "cate has own product" });
        } else {
            deleteSub = await SubCategory.findByIdAndDelete(req.params.id);
            res.send(deleteSub);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }


})
module.exports = router;