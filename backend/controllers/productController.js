import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc delete a product
// @route DELETE /api/product/:id
// @access admin private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.deleteOne()
        res.status(200).message('Product deleted')
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }
});

// @desc fetch all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (products) {
        res.json(products)
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }
});

// @desc fetch a product
// @route GET /api/product/:id
// @access public
const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }
});


// @desc Add a product
// @route POST /api/products
// @access private Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample cat',
        countInStock: 0,
        numReviews: 0,
        description: 'sample desc'
    })
    const createdProduct = await product.save();

    if (createdProduct) {
        res.status(200).json(createdProduct);
    } else {
        res.status(404);
        throw new Error('Product could not be created.')
    }
});

// @desc Edit a product
// @route PUT /api/products/:id
// @access private Admin
const updateProduct = asyncHandler(async (req, res) => {
    console.log('ffff', req.params)
    const product = await Product.findById({ _id: req.body._id });
    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.description = req.body.description || product.description;
    }

    const updatedProduct = await product.save();

    if (updatedProduct) {
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product could not be Updated.')
    }
});

// @desc Create a product review
// @route PUT /api/products/:id/reviews
// @access private 
const createProductReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const { review, rating } = req.body;

    if (product) {
        const alreadyReviewed = product.reviews.find(review => {
            review.user.toString() == req.user._id.toString()
        });
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('User has already reviewed this product')
        } else {
            const review = {
                user: req.user._id,
                name: req.user.name,
                review: Number(review),
                rating
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length();
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.numReviews;
        }
        await product.save();
        res.status(201).json({ message: 'Review Added' });
    } else {
        res.status(404).json({ message: 'unable to find product' })
    }
});
export { getProducts, getProductsById, createProduct, updateProduct, deleteProduct, createProductReview };