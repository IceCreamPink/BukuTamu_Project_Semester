const koneksi = require("./Koneksi");

// Select ALL
const selecttamu = (callback) => {
  const q = `SELECT * FROM tamu where deleted_at is null`;
  koneksi.query(q, callback);
};

// Insert (Tambah)
const inserttamu = (
  nama_tamu,
  no_hp,
  jabatan,
  unit_kerja,
  tujuan,
  yang_dituju,
  keterangan,
  callback
) => {
  const q =
    "INSERT INTO tamu(nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan) VALUES(?,?,?,?,?,?,?)";
  koneksi.query(
    q,
    [nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan],
    callback
  );
};

// Select ById
const selecttamuById = (id, callback) => {
  const q = "SELECT * FROM tamu where id=?";
  koneksi.query(q, [id], callback);
};

// Update
const updatetamu = (
  id,
  nama_tamu,
  no_hp,
  jabatan,
  unit_kerja,
  tujuan,
  yang_dituju,
  keterangan,
  callback
) => {
  const q =
    "update tamu set nama_tamu=?, no_hp=?, jabatan=?, unit_kerja=?, tujuan=?, yang_dituju=?, keterangan=? where id=?";
  koneksi.query(
    q,
    [
      nama_tamu,
      no_hp,
      jabatan,
      unit_kerja,
      tujuan,
      yang_dituju,
      keterangan,
      id,
    ],
    callback
  );
};

// Delete
const deletetamu = (id, callback) => {
  const q = "UPDATE tamu set deleted_at = now() where id=?";
  koneksi.query(q, [id], callback);
};

module.exports = {
  selecttamu,
  inserttamu,
  selecttamuById,
  updatetamu,
  deletetamu,
};
