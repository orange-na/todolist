const express = require("express");
const {} = require("../controllers/task");
const { register, login, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
