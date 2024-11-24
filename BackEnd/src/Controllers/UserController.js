const User = require("../Models/User");
const bcrypt = require("bcryptjs");
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
const searchusers = (req, res) => {
  const { nama, email } = req.body;
  User.searchusers(id, (err, result) => {
    if (!nama || !email) {
      return res.status(400).json({ error: err.message });
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
  const { nama, email, password } = req.body;
  User.insertUsers(nama, email, password, (err, result) => {
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
  const { nama, email, password } = req.body;
  User.updateUsers(id, nama, email, password, (err, result) => {
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

// Status Select User By Email
const login = (req, res) => {
  const { email, password } = req.body;
  console.log(password);

  User.selectUserByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result === 0) {
      return res.status(400).json({ message: "Email Tidak Ditemukan" });
    }

    const user = result[0];
    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ message: "Password Keliru" });
    }

    const token = jwt.sign({ id: user.id }, "semesterancuyy", {
      expiresIn: 86400,
    });
    res.status(200).json({ auth: true, token });
  });
};

// Status LogOut
const logout = (req, res) => {
  res.status(200).json({ auth: false, token: null });
};
module.exports = { index, storeUser, showUserById, UpdateUser, destroyUser, login, logout };
