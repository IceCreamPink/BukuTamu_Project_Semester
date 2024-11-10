const koneksi = require("./Koneksi");
const bcyrpt = require("bcryptjs");

// Select
const selectUsers = (callback) => {
  const q = `SELECT * FROM users `;
  koneksi.query(q, callback);
};

// Select USers ById
const selectUsersByID = (id, callback) => {
  const q = `select * from users where id=?`;
  koneksi.query(q, [id], callback);
};

// // Select Users ByEmail
// const selectUsersByEmail = (email, callback) => {
//   const q = `select * from users where email=?`;
//   koneksi.query(q, [email], callback);
// };

// Insert
const insertUsers = (nama, email, jabatan, password, callback) => {
  if (password) {
    const hashedPassword = bcyrpt.hashSync(password, 10);
    const q = `insert into users (nama, email, jabatan,  password) values(?, ?, ?, ?)`;
    koneksi.query(q, [nama, email, jabatan, hashedPassword], callback);
  } else {
    console.error("Password harus diisi");
  }
};

// Update
const updateUsers = (id, nama, email, jabatan, password, callback) => {
  if (password) {
    const hashedPassword = bcyrpt.hashSync(password, 10);
    const q = `update users set nama=?, email=?, jabatan=?, password=? where id=?`;
    koneksi.query(q, [nama, email, jabatan, hashedPassword, id], callback);
  } else {
    const q = `update users set nama=?, email=?, jabatan=?, where id=?`;
    koneksi.query(q, [nama, email, jabatan, id], callback);
  }
};

// Delete
const deleteUser = (id, callback) => {
  const q = "DELETE FROM users WHERE id=?";
  koneksi.query(q, [id], callback);
};

module.exports = {
  selectUsers,
  selectUsersByID,
  //   //   selectUsersByEmail,
  insertUsers,
  updateUsers,
  deleteUser,
};
