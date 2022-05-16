const router = require('express').Router();
const Product = require('../models/productModel');

//@desc   GET all products from db
//@route  GET /api/products
//@access Public
router.get('/', (req, res) => {
        Product.find((err, docs) => {
                res.json(docs);
        });
});

//@desc   GET a product by id from db
//@route  GET /api/products/:id
//@access Public
router.get('/:id', (req, res) => {
        Product.findById(req.params.id)
               .then((product) => res.json(product))
               .catch((err) => res.status(400).json("Error:" + err))
});

//@desc   Add product to db
//@route  POST /api/products
//@access Public
router.post("/add", (req, res) => {
        const newProduct = new Product(req.body);
        newProduct.save().then((product) => res.json(product));
});

//@desc   Update product from db
//@route  POST /api/products/update/:id
//@access Public
router.post("/update/:id", (req, res) => {
        Product.findByIdAndUpdate(req.params.id).then((product) => {
                console.log(product);
                (req.body.itemName ? product.itemName = req.body.itemName : null),
                        (req.body.description ? product.description = req.body.description : null),
                        (req.body.countInStock != 0 ? product.countInStock = Number(req.body.countInStock) : null),
                        (req.body.price != 0 ? product.price = Number(req.body.price) : null),
                        (req.body.date ? product.date = Date(req.body.date) : null),
                        (req.body.imageUrl ? product.imageUrl = req.body.imageUrl : null),
                        (req.body.farmerId ? product.farmerId = req.body.farmerId : null);
                product.save().then(() => res.json(product)).catch((err) => res.json(err));
        }).catch((err) => res.json(err));
});
// router.post("/updateCountInStock/:id", (req, res) => {
//         Product.findByIdAndUpdate(req.params.id).then((product) => {
//                 console.log(product);
//                 (req.body.countInStock != 0 ? product.countInStock = Number(req.body.countInStock) : null),
//                         product.save().then(() => res.json(product)).catch((err) => res.json(err));
//         }).catch((err) => res.json(err));

//         //       req.body.forEach(item => {
//         //         Product.findByIdAndUpdate(item.itemId).then((product) => {
//         //                 console.log(product);
//         //                 (item.countInStock != 0 ?product.countInStock = Number(req.body.countInStock):null),
//         //         product.save()
//         //               })  
//         // });
//         // res.json("product count update")
// })
//@desc   Delete product
//@route  DELETE /api/products
//@access Public
router.delete("/:id", (req, res) => {
        Product.findByIdAndDelete(req.params.id)
                .then((product) =>
                        res.json(
                                product.id
                        )).catch((err) => res.status(400).json("Error: " + err));
        console.log(res.data);
})
// router.post("/updateMany",(req,res)=>{
//         Product.insertMany([...req.body]).then((product)=>{
//                 res.json(product).catch((err)=>res.json(err))
//         }).catch((err)=>{
//                 console.log(err)
//         })
// })
module.exports = router;