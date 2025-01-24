const express = require("express");
const userController = require("../controller/user.controller");
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/verify-otp', userController.verifyOtp);
router.post('/change-password', authMiddleware.authResetPasssMiddleware, userController.resetPassword);
router.get('/', authMiddleware.authMiddleware, userController.getUsers);
router.get('/:id', authMiddleware.authMiddleware, userController.getUser);
router.post('/key-exchange', authMiddleware.authMiddleware, userController.keyExchange);

module.exports = router;
