const jwt = require("jsonwebtoken");
const pool = require("../db");

// const getTask = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.json("Not authenticated!!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!!");
//     const q = "SELECT * FROM tasks WHERE uid = $1";
//     const values = [userInfo];

//     pool.query(q, values, (err, results) => {
//       if (err) return res.json(err);
//       return res.status(200).json(results.rows);
//     });
//   });
// };

const getTask = (req, res) => {
  const q = "SELECT * FROM tasks WHERE uid = $1";
  const values = [req.body.uid];
  console.log(values);

  pool.query(q, values, (err, results) => {
    if (err) return res.json(err);
    return res.status(200).json(results.rows);
  });
};

// const addTask = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.json("Not authenticated!!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!!");
//     const q = 'INSERT INTO tasks ("desc", "uid", "date") VALUES ($1, $2, $3)';
//     const values = [req.body.desc, userInfo, req.body.date];

//     pool.query(q, values, (err, results) => {
//       if (err) return res.json(err);
//       return res.status(200).json("Post has been created!!");
//     });
//   });
// };

const addTask = (req, res) => {
  const q = 'INSERT INTO tasks ("desc", "uid", "date") VALUES ($1, $2, $3)';
  const values = [req.body.desc, req.body.uid, req.body.date];

  pool.query(q, values, (err, results) => {
    if (err) return res.json(err);
    return res.status(200).json("Post has been created!!");
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
