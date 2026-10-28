const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Item = require("../models/Item");
const Request = require("../models/Request");

const router = express.Router();

const checkAdmin = (req, res, next) => {
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

        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};


router.get("/users", checkAdmin, async (req, res) => {
    try {
        const users = await User.find()
            .select("-password");

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/stats", checkAdmin, async (req, res) => {
    try {
        const users = await User.countDocuments();

        const items = await Item.countDocuments();

        const sold = await Item.countDocuments({
            status: "Sold"
        });

        res.json({
            users,
            items,
            sold
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/user-activity", checkAdmin, async (req, res) => {
    try {
        const users = await User.find({
            role: { $ne: "admin" }
        }).select("-password");

        const items = await Item.find()
            .populate(
                "seller",
                "name email department"
            );

        const purchases = await Request.find({
            status: "Accepted"
        })
            .populate("item")
            .populate(
                "buyer",
                "name email department"
            )
            .populate(
                "seller",
                "name email department"
            );

        const activity = users.map((user) => {

            const listedItems = items.filter(
                (item) =>
                    item.seller &&
                    String(item.seller._id) ===
                    String(user._id)
            );

            const boughtItems = purchases.filter(
                (purchase) =>
                    purchase.buyer &&
                    String(purchase.buyer._id) ===
                    String(user._id)
            );

            return {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    department: user.department
                },

                listedItems,

                boughtItems
            };
        });

        res.json(activity);

    } catch (error) {
        console.log("User activity error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;