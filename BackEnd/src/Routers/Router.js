const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const Tamucontroller = require("../Controllers/Tamucontroller");
const authJwt = require("../Middleware/AuthMiddleware");
const Excelcontroller = require("../Controllers/Excelcontroller");

// User
router.get("/user", authJwt, UserController.index);
router.post("/user", authJwt, UserController.storeUser);
router.get("/user/:id", authJwt, UserController.showUserById);
router.put("/user/:id", authJwt, UserController.UpdateUser);
router.delete("/user/:id", authJwt, UserController.destroyUser);

// Search

// Tamu
router.get("/tamu", authJwt, Tamucontroller.index);
router.post("/tamu", authJwt, Tamucontroller.storetamu);
router.put("/tamu/:id", authJwt, Tamucontroller.updatetamu);
router.delete("/tamu/:id", authJwt, Tamucontroller.destroytamu);

// Exce;
router.get("/books/exportuser", Excelcontroller.xlsxUser);
router.get("/books/exporttamu", Excelcontroller.xlsxTamu);

// Login & Logout
router.post("/login", UserController.login);
router.post("/logout", authJwt, UserController.logout);

module.exports = router;
