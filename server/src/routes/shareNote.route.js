const express = require("express");
const router = express.Router();
const ShareNoteController = require("../controller/shareNote.controller");
const authMiddleware = require('../middleware/auth.middleware');

router.post("/create",authMiddleware.authMiddleware, ShareNoteController.createShareNote);
router.get("/:id/:userId", authMiddleware.authMiddleware, ShareNoteController.getShareNote);
  
module.exports = router;
  