const express = require("express");
const { addTask, deleteTask, getTask } = require("../controllers/task");

const router = express.Router();

router.get("/", getTask);

router.post("/add", addTask);

router.delete("/delete/:id", deleteTask);

module.exports = router;
