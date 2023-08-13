const pool = require("../db");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
  q = "SELECT * FROM users WHERE username = $1";

  pool.query(q, [req.body.username], (err, results) => {
    if (err) return res.status(404).json(err);
    if (results.rows.length) return res.json("User already exists!!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (username, password) VALUES ($1, $2)";
    const values = [req.body.username, hashedPassword];

    pool.query(q, values, (err, results) => {
      if (err) return res.status(404).json(err);
      return res.status(200).json("User has been created!!");
    });
  });
};

const login = (req, res) => {
  res.json("hello users!!");
};

const logout = (req, res) => {
  res.json("hello users!!");
};

module.exports = { register, login, logout };
