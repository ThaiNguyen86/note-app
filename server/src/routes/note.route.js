const express = require('express');
const noteController = require('../controller/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware.authMiddleware, noteController.createNote);
router.get('/:noteId', authMiddleware.authMiddleware, noteController.getNote);
router.post('/share/:noteId', authMiddleware.authMiddleware, noteController.shareNote);
router.delete('/:noteId', authMiddleware.authMiddleware, noteController.deleteNote);

module.exports = router;