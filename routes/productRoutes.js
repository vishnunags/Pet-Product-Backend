const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

// GET all products
router.get('/products', async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await productService.getProduct(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST add new product
router.post('/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const addedProduct = await productService.addProduct(newProduct);
        res.status(201).json(addedProduct);  // Return added product in response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
