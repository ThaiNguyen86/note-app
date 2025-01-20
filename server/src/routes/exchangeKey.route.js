const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/exchange-key", userController.exchangeKey);
  
module.exports = router;
  