const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

// @desc    Create feedback
// @route   POST /api/feedback/create
// @access  Private
const createFeedback = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const feedback = await Feedback.create({
    user: req.user.id,
    title,
    description,
  });

  res.status(200).json(feedback);
});

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private
const getAllFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.find();

  res.status(200).json(feedback);
});

module.exports = {
  createFeedback,
  getAllFeedback,
};
