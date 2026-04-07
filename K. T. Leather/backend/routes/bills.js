const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const billController = require("../controllers/billController");

const router = express.Router();

router.post("/", authMiddleware, billController.createBill);
router.get("/", authMiddleware, billController.getBills);
router.get("/next-bill/number", authMiddleware, billController.getNextBillNumber);
router.get("/:id", authMiddleware, billController.getBillById);
router.get("/:id/pdf", authMiddleware, billController.generatePdf);

module.exports = router;
