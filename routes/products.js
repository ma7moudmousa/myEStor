const express = require('express');
const authMiddleWare = require('../middleware/auth');
const isAdminMidleWare = require('../middleware/isAdmin');
const router = express.Router();
const Product = require('../models/product');
const SubCategory = require('../models/sub_cate');
router.post('/', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        let newProduct = await Product.find({ 'name': req.body.name });
        let check = true;
        if (newProduct) {
            for (let i = 0; i < newProduct.length; i++) {
                if (newProduct[i].subcategory == req.body.subcategory) {
                    res.send({ message: "the name is already exist" });
                    check = false;
                }
            }
            if (check) {
                newProduct = new Product({
                    name: req.body.name
                    , desc: req.body.desc
                    , price: req.body.price
                    , image: req.body.image
                    , rating: req.body.rating
                    , subcategory: req.body.subcategory
                })
                const Sub = await SubCategory.findById(req.body.subcategory).populate('category');
                const result = await newProduct.save();
                res.send({ new: result, sub: Sub });
            }
        } else {
            newProduct = new Product({
                name: req.body.name
                , desc: req.body.desc
                , price: req.body.price
                , image: req.body.image
                , rating: req.body.rating
                , subcategory: req.body.subcategory
            })
            const Sub = await SubCategory.findById(req.body.subcategory).populate('category');
            const result = await newProduct.save();
            res.send({ new: result, sub: Sub });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
})
router.get('/', async (req, res) => {
    try {
        const allProduct = await Product.find().populate('subcategory');
        res.send(allProduct)
    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('subcategory');

        res.send(product)

    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.put('/:id', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        let newProduct = await Product.find({ 'name': req.body.name });
        let check = true;
        if (newProduct) {
            for (let i = 0; i < newProduct.length; i++) {
                if (newProduct[i].subcategory == req.body.subcategory) {
                    res.send({ message: "the name is already exist" });
                    check = false;
                }
            }
            if (check) {
                newProduct = new Product({
                    name: req.body.name
                    , desc: req.body.desc
                    , price: req.body.price
                    , image: req.body.image
                    , rating: req.body.rating
                    , subcategory: req.body.subcategory
                })
                const Sub = await SubCategory.findById(req.body.subcategory).populate('category');
                const result = await newProduct.save();
                res.send({ new: result, sub: Sub });
            }
        }
        else {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                name: req.body.name
                , desc: req.body.desc
                , price: req.body.price
                , image: req.body.image
                , rating: req.body.rating
                , subcategory: req.body.subcategory
            }, { new: true })
            const Sub = await SubCategory.findById(req.body.subcategory).populate('category');
            res.send({ new: updatedProduct, sub: Sub });
        }


    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/:id', [authMiddleWare, isAdminMidleWare], async (req, res) => {
    try {
        const deleteProd = await Product.findByIdAndDelete(req.params.id);
        res.send(deleteProd);
    } catch (error) {
        res.status(400).send(error.message);
    }

})
module.exports = router;
