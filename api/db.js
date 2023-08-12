const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: process.env.PG_PASSWORD,
  port: "5432",
});

module.exports = pool;
