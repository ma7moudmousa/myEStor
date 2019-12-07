const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cateRouter = require('./routes/categories');
const subRouter = require('./routes/subCategories');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const app = express();
// const config = require('config');
// update to match the domain you will make the request from
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-auth-token, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    next();
});
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/category', cateRouter);
app.use('/api/subcategory', subRouter);
app.use('/api/product', productRouter);
app.use('/api/auth', authRouter);
mongoose.connect("mongodb://localhost/My_Estore", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log("dataBase connected");
}).catch((error) => {
    console.log(error.message);
})
app.listen(3000, () => {
    console.log("server is listen");
})
// console.log(config.get('mysecretkey'))