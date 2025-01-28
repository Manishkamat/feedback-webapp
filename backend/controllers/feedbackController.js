const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");
const { mongoose } = require("mongoose");

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
  // console.log(req.user)
  // const feedback = await Feedback.find();
  const feedback = await Feedback.find({user: req.user._id});

  res.status(200).json(feedback);
});

// @desc    Get feedback by ID
// @route   GET /api/feedback/:id
// @access  Private
const getFeedback = asyncHandler(async (req, res) => {
  // console.log(req.user)
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404).json({ message: "Feedback not found" });
    return;
  }

  res.status(200).json(feedback);
})

// @desc Update feedback
// @route PUT /api/feedback/:id
// @access Private
const updateFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  const { title, description } = req.body;

  if (!feedback) {
    res.status(400);
    throw new Error("Feedback not found");
  }

  // console.log(req.user._id, req.body.user, feedback.user)

  // Check If authorized user
  if (req.user._id.toString() != feedback.user.toString()) {
    res.status(401);
    throw new Error("You are not Authorized");
  }

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedFeedback);
});

// @desc Delete feedback
// @route DELETE /api/feedback/:id
// @access Private
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(400);
    throw new Error("Feedback not found");
  }


  // Check If authorized user
  if (req.user._id.toString() != feedback.user.toString()) {
    res.status(401);
    throw new Error("You are not Authorized");
  }

  await Feedback.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
})


module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback
};
