import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

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

export { getProducts, getProductsById };