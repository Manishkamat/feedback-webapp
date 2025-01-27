const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");

router.use(protect);

router.route("/create").post(createFeedback);
router.route("/").get(getAllFeedback);


module.exports = router;
