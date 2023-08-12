const pool = require("../db");

const getTask = (req, res) => {
  q = "SELECT * FROM tasks";

  pool.query(q, (err, results) => {
    if (err) return res.status(400).json(err);
    return res.json(results.rows);
  });
};

const addTask = (req, res) => {
  const q = 'INSERT INTO tasks ("desc") VALUES ($1)';

  pool.query(q, [req.body.desc], (err, results) => {
    if (err) return res.json(err);
    return res.json("Add task successfully!!");
  });
};

const deleteTask = (req, res) => {
  const q = "DELETE FROM tasks WHERE id = $1";

  pool.query(q, [req.params.id], (err, results) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json("The task has been deleted!!");
  });
};
module.exports = { addTask, deleteTask, getTask };
