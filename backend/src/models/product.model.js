const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    imageUrl : String,
    name : String,
    price : Number,
    rating : Number,
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;