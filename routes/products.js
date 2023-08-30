const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

// Get-Products (Endpoint: "http://localhost:5000/api/products" using "GET" (auth) Required).
router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        // res.status(200).json(products);
        res.status(200).json({ message: "Success", products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    };
});

// Get-Specific-Product (Endpoint: "http://localhost:5000/api/products/:id" using "GET" (auth) Required).
router.get('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        res.status(200).json({ message: "Success", product });
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
});

// Create-Product (Endpoint: "http://localhost:5000/api/products" using "POST" (auth) Required).
router.post('/', async (req, res) => {
    try {
        console.log("req.body",req.body)
        const product = new Users(req.body);
        await product.save();
        res.status(201).json({ message: 'Success', product });
    } catch (error) {
        res.status(500).json({ message: "Error on add product", error });
    }
});

// Update-Product (Endpoint: "http://localhost:5000/api/products/:id" using "PUT" (auth) Required).
router.put('/:id', async (req, res) => {
    try {
        await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
})

// Delete-Product (Endpoint: "http://localhost:5000/api/products/:id" using "DELETE" (auth) Required).
router.delete('/:id', async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

module.exports = router;