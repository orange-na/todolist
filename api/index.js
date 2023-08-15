const express = require("express");
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const pool = require("./db");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: "todolist-dusky-gamma.vercel.app",
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(results.rows);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT || 8800, () => {
  console.log("connected to api!!");
});
