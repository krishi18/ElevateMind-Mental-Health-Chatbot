const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createCheckIn, getAllCheckIns, deleteCheckIn } = require("../controllers/common/checkIn.controller");

router.post("/", authMiddleware, createCheckIn);
router.get("/", authMiddleware, getAllCheckIns);
router.delete("/:id", authMiddleware, deleteCheckIn);

module.exports = router;
