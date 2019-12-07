const mongoose = require('mongoose');
const subCate = new mongoose.Schema({
    name: {
        type: String
        , required: true
    }
    , category: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'category'
    }
})
const SubCate = mongoose.model('subcategory', subCate);
module.exports = SubCate;