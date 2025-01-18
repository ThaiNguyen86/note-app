const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/verify-token', userController.verifyToken);
router.post('/reset-password', userController.resetPasswordController);

module.exports = router;
