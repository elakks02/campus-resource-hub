const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    type: String,
    price: Number,
    condition: String,

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    college: String,

    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model("Item", itemSchema);