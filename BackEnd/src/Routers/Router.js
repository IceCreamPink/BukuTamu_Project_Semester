const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

// User
router.get("/user", UserController.index);
router.post("/user", UserController.storeUser);
router.get("/user/:id", UserController.showUserById);
router.put("/user/:id", UserController.UpdateUser);
router.delete("/user/:id", UserController.destroyUser);

module.exports = router;
