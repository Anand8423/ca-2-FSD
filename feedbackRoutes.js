const express = require("express");
const router = express.Router();
const Feedback = require("./feedback");

// POST
router.post("/", async (req, res) => {
    try {
        const { studentName, courseName, message, rating } = req.body;

        const feedback = await Feedback.create({
            studentName,
            courseName,
            message,
            rating
        });

        res.status(201).json(feedback);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET with Pagination
router.get("/", async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const feedbacks = await Feedback.find()
            .skip(skip)
            .limit(limit);

        const totalRecords = await Feedback.countDocuments();

        res.json({
            currentPage: page,
            totalRecords,
            feedbacks
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH Status
router.patch("/:id", async (req, res) => {

    try {

        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.json(feedback);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;