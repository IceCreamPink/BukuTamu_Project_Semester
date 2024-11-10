const mysql = require("mysql8");
const koneksi = mysql.createConnection({
  host: "localhost",
  user: "IceCreamPink",
  password: "admin123",
  database: "BukuTamu_Semester",
});

koneksi.connect((err) => {
  if (err) {
    console.error("Error koneksi ke Database", err.stack);
    retrun;
  }
  console.log("-----------------------------");
  console.log("Berhasil koneksi ke Databases");
  console.log("-----------------------------");
});

module.exports = koneksi;
