const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createFeedback,
  getAllFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback
} = require("../controllers/feedbackController");

router.use(protect);

router.route("/create").post(createFeedback);
router.route("/").get(getAllFeedback);
router
  .route("/:id")
  .get(getFeedback)
  .put(updateFeedback)
  .delete(deleteFeedback);

module.exports = router;
