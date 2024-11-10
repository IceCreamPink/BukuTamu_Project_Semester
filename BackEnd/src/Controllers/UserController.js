const User = require("../Models/User");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Show
const index = (req, res) => {
  User.selectUsers((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.lenght === 0) {
      return res.status(404).json({ message: "User Kosong" });
    }
    res.status(200).json(result);
  });
};

// Show ById
const showUserById = (req, res) => {
  const { id } = req.params;
  User.selectUsersByID(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.lenght === 0) {
      return res.status(404).json({ message: "User Tidakk Tersedia" });
    }
    res.status(200).json(result[0]);
  });
};

// // // Show ByEmail

// Insert
const storeUser = (req, res) => {
  const { nama, email, jabatan, password } = req.body;
  User.insertUsers(nama, email, jabatan, password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(200)
      .json({ message: "Berhasil disimpan", userId: result.insertId });
  });
};

// Update;
const UpdateUser = (req, res) => {
  const { id } = req.params;
  const { nama, email, jabatan, password } = req.body;
  User.updateUsers(id, nama, email, jabatan, password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json("Data berhasil");
  });
};

// Delete
const destroyUser = (req, res) => {
  const { id } = req.params;
  User.deleteUser(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json("Data berhasil dihapus");
  });
};

module.exports = { index, storeUser, showUserById, UpdateUser, destroyUser };
