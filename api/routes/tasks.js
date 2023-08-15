const express = require("express");
const { addTask, deleteTask, getTask } = require("../controllers/task");

const router = express.Router();

router.post("/", getTask);

router.post("/add", addTask);

router.delete("/delete/:id", deleteTask);

module.exports = router;
