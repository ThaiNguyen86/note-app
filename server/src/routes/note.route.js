const express = require('express');
const noteController = require('../controller/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, noteController.createNote);
router.get('/:noteId', authMiddleware, noteController.getNote);
router.post('/share/:noteId', authMiddleware, noteController.shareNote);
router.delete('/:noteId', authMiddleware, noteController.deleteNote);

module.exports = router;