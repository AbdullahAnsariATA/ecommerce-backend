const express = require('express');
const router = express.Router();

// Available API Routes.
router.use('/api/users', require('./users.js'))
router.use('/api/products', require('./products.js'))
router.use('/api/orders', require('./orders.js'))

module.exports = router;