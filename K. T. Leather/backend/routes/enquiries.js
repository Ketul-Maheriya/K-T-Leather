const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const enquiryController = require("../controllers/enquiryController");

const router = express.Router();

router.post("/", enquiryController.createEnquiry);
router.get("/", authMiddleware, enquiryController.getEnquiries);
router.get("/:id", authMiddleware, enquiryController.getEnquiryById);
router.patch("/:id", authMiddleware, enquiryController.updateEnquiry);
router.delete("/:id", authMiddleware, enquiryController.deleteEnquiry);

module.exports = router;
