const mongoose = require('mongoose');
const productShema = new mongoose.Schema({
    name: String
    , desc: String
    , price: Number
    , image: String
    , rating: Number
    , subcategory: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'subcategory'
    }
})
const Product = mongoose.model('product', productShema);
module.exports = Product;