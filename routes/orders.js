const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');
const verifyToken = require('../middlewares/verifyToken');

// Get-Orders (Endpoint: "http://localhost:5000/api/orders" using "GET" (auth) Required).
router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json({ message: "Success", data: orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error });
    }
});

// Get User-Orders (Endpoint: "http://localhost:5000/api/orders/userorders" using "GET" (auth required).
router.get("/userorders", verifyToken, async (req, res) => {
    try {
        const userId = req.decoded._id
        const orders = await Orders.find({ userId });
        res.status(200).json({ message: "Success", orders });
    } catch (err) {
        res.status(500).json({ message: "Your orders not found" });
    }
});

// Get-Specific-Order (Endpoint: "http://localhost:5000/api/orders/:id" using "GET" (auth) Required).
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const specificOrder = await Orders.findById(req.params.id);
        res.status(200).json({ message: "Success", specificOrder });
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
});

// Create-Order (Endpoint: "http://localhost:5000/api/orders" using "POST" (auth) Required).
router.post('/', verifyToken, async (req, res) => {
    try {
        const { products, address, amount } = req.body;
        const order = new Orders({ userId: req.decoded._id, products, address, amount });
        await order.save();
        res.status(201).json({ message: 'Success', order });
    } catch (error) {
        res.status(500).json({ message: "Error on add order", error });
    }
});

// Update-Order (Endpoint: "http://localhost:5000/api/orders/:id" using "PUT" (auth) Required).
router.put('/:id', async (req, res) => {
    try {
        await Orders.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: "Error updating Order", error });
    }
})

// Delete-Order (Endpoint: "http://localhost:5000/api/orders/:id" using "DELETE" (auth) Required).
router.delete('/:id', async (req, res) => {
    try {
        await Orders.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
});

module.exports = router;