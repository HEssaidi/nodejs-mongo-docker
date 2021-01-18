const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const objetRouter = require("./routes/objet-router");
const userRouter = require("./routes/user-router");
const discussionRouter = require("./routes/discussion-router");

const app = express();
const apiPort = 3001;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
global.__basedir = __dirname;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World now it's from docker second try!");
});

app.use("/api", objetRouter);
app.use("/api/user", userRouter);
app.use("/api/discussion", discussionRouter);

app.listen(apiPort,() => console.log(`Server running on port ${apiPort}`));
