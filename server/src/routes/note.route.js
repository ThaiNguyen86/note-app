const express = require('express');
const noteController = require('../controller/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/create', authMiddleware.authMiddleware, noteController.createNote);
router.get('/:noteId', authMiddleware.authMiddleware, noteController.getNote);
router.get('/', authMiddleware.authMiddleware, noteController.getNotes);
router.delete('/:noteId', authMiddleware.authMiddleware, noteController.deleteNote);

module.exports = router;