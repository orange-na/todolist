const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  q = "SELECT * FROM users WHERE username = $1";

  pool.query(q, [req.body.username], (err, results) => {
    if (err) return res.status(404).json(err);
    if (results.rows.length)
      return res.status(403).json("User already exists!!");

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
  const q = "SELECT * FROM users WHERE username = $1";

  pool.query(q, [req.body.username], (err, results) => {
    if (err) res.status(404).json(err);
    if (!results.rows.length) return res.status(403).json("User not found!!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      results.rows[0].password
    );

    if (!checkPassword)
      return res.status(403).json("Password is not correct!!");

    const token = jwt.sign(results.rows[0].id, "secretkey");
    const { password, ...others } = results.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out!!");
};

module.exports = { register, login, logout };
