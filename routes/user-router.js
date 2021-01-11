const express = require("express");

// router.post("/upload", uploadController.uploadFile);

const UserCtrl = require("../controllers/user-ctrl");
const userRouter = express.Router();
userRouter.post("/register", UserCtrl.createUser);
userRouter.post("/login", UserCtrl.loginUser);

module.exports = userRouter;
