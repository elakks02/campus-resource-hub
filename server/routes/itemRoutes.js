const express = require("express");
const jwt = require("jsonwebtoken");
const Item = require("../models/Item");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const item = new Item({
            ...req.body,
            seller: user._id,
            college: user.college
        });

        await item.save();

        res.json(item);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/", async (req, res) => {
    try {
        const items = await Item.find({
            status: "Available"
        });

        res.json(items);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get("/mine", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const items = await Item.find({
            seller: decoded.id
        });

        res.json(items);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json(item);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        if (item.seller.toString() !== decoded.id) {
            return res.status(403).json({
                message: "You can only remove your own items"
            });
        }

        item.status = "Removed";

        await item.save();

        res.json({
            message: "Item removed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        if (String(item.seller) !== String(decoded.id)) {
            return res.status(403).json({
                message: "You can only update your own items"
            });
        }

        if (item.status !== "Available") {
            return res.status(400).json({
                message: "This item cannot be updated"
            });
        }

        if (!["Sell", "Donate"].includes(req.body.type)) {
            return res.status(400).json({
                message: "Invalid item type"
            });
        }

        item.name = req.body.name;
        item.description = req.body.description;
        item.category = req.body.category;
        item.type = req.body.type;
        item.condition = req.body.condition;

        if (req.body.type === "Donate") {
            item.price = 0;
        } else {
            item.price = Number(req.body.price);
        }

        await item.save();

        res.json({
            message: "Item updated successfully",
            item
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;