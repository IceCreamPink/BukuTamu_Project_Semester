const koneksi = require("./Koneksi");
const bcyrpt = require("bcryptjs");

// Select
const selectUsers = (callback) => {
  const q = `SELECT * FROM users `;
  koneksi.query(q, callback);
};
const searchusers = (callback) => {
  const q = `select * from users where nama like %%`;
  koneksi.query(q, [nama, email], callback);
};

// Select USers ById
const selectUsersByID = (id, callback) => {
  const q = `select * from users where id=?`;
  koneksi.query(q, [id], callback);
};

// Select UserByEmail
const selectUserByEmail = (email, callback) => {
  const q = `select * from users where email=?`;
  koneksi.query(q, [email], callback);
};

// Insert
const insertUsers = (nama, email, password, callback) => {
  if (password) {
    const hashedPassword = bcyrpt.hashSync(password, 10);
    const q = `insert into users (nama, email, password) values(?, ?, ?)`;
    koneksi.query(q, [nama, email, hashedPassword], callback);
  } else {
    console.error("Password harus diisi");
  }
};

// Update
const updateUsers = (id, nama, email, password, callback) => {
  if (password) {
    const hashedPassword = bcyrpt.hashSync(password, 10);
    const q = `update users set nama=?, email=?, password=? where id=?`;
    koneksi.query(q, [nama, email, hashedPassword, id], callback);
  } else {
    const q = `update users set nama=?, email=?, where id=?`;
    koneksi.query(q, [nama, email, id], callback);
  }
};

// Delete
const deleteUser = (id, callback) => {
  const q = "DELETE FROM users WHERE id=?";
  koneksi.query(q, [id], callback);
};

module.exports = {
  selectUsers,
  searchusers,
  selectUsersByID,
  selectUserByEmail,
  insertUsers,
  updateUsers,
  deleteUser,
};
