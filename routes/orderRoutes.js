const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const orderService = require('../services/orderService');

// Existing product routes...

// POST proceed to checkout
router.post('/checkout', async (req, res) => {
    try {
        const order = req.body;
        const createdOrder = await orderService.createOrder(order);
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
