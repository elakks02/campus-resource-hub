const express = require("express");
const jwt = require("jsonwebtoken");

const Request = require("../models/Request");
const Item = require("../models/Item");
const User = require("../models/User");

const router = express.Router();

const getUser = async (req) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return null;
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    return await User.findById(decoded.id);
};


router.post("/", async (req, res) => {
    try {
        const user = await getUser(req);

        if (!user) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const item = await Item.findById(req.body.itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        if (item.status !== "Available") {
            return res.status(400).json({
                message: "This item is no longer available"
            });
        }

        if (String(item.seller) === String(user._id)) {
            return res.status(400).json({
                message: "You cannot request your own item"
            });
        }

        const existingRequest = await Request.findOne({
            item: item._id,
            buyer: user._id,
            status: "Pending"
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "You already requested this item"
            });
        }

        const request = new Request({
            item: item._id,
            buyer: user._id,
            seller: item.seller
        });

        await request.save();

        res.json({
            message: "Request sent successfully",
            request
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/buyer", async (req, res) => {
    try {
        const user = await getUser(req);

        if (!user) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const requests = await Request.find({
            buyer: user._id
        })
            .populate("item")
            .populate("seller", "name email");

        res.json(requests);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/seller", async (req, res) => {
    try {
        const user = await getUser(req);

        if (!user) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const requests = await Request.find({
            seller: user._id
        })
            .populate("item")
            .populate("buyer", "name email");

        res.json(requests);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.patch("/:id/accept", async (req, res) => {
    try {
        const user = await getUser(req);

        if (!user) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        if (String(request.seller) !== String(user._id)) {
            return res.status(403).json({
                message: "You cannot accept this request"
            });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({
                message: "Request already processed"
            });
        }

        const item = await Item.findById(request.item);

        if (!item || item.status !== "Available") {
            return res.status(400).json({
                message: "Item is no longer available"
            });
        }

        request.status = "Accepted";
await request.save();

if (item.type === "Donate") {
    item.status = "Donated";
} else {
    item.status = "Sold";
}

await item.save();

        await Request.updateMany(
            {
                item: item._id,
                _id: { $ne: request._id },
                status: "Pending"
            },
            {
                status: "Rejected"
            }
        );

        res.json({
            message: "Request accepted. Item is now sold."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.patch("/:id/reject", async (req, res) => {
    try {
        const user = await getUser(req);

        if (!user) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        if (String(request.seller) !== String(user._id)) {
            return res.status(403).json({
                message: "You cannot reject this request"
            });
        }

        request.status = "Rejected";

        await request.save();

        res.json({
            message: "Request rejected"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;