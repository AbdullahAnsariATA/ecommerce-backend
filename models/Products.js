const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    description: { type: String },
    brand: { type: String, default: "MS-COMMERCIAL" },
    category: { type: String, default: "General" },
    image: { type: String },
}, { timestamps: true });

const Products = mongoose.model('Products', productSchema);
module.exports = Products;