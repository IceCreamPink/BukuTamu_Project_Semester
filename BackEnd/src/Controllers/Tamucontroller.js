const tamu = require("../Models/Tamu");

// Status Tampil ALL
const index = (req, res) => {
  tamu.selecttamu((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.lenght === 0) {
      return res.status(404).json({ message: "tamu kosong" });
    }
    res.status(200).json(result);
  });
};

// Status Post
const storetamu = (req, res) => {
  const {
    nama_tamu,
    no_hp,
    jabatan,
    unit_kerja,
    tujuan,
    yang_dituju,
    keterangan,
  } = req.body;
  tamu.inserttamu(
    nama_tamu,
    no_hp,
    jabatan,
    unit_kerja,
    tujuan,
    yang_dituju,
    keterangan,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({ message: "Berhasil disimpan", tamuId: result.insertId });
    }
  );
};

// Status Tampil ById
const showtamu = (req, res) => {
  const { id } = req.params;
  tamu.selecttamuById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.lenght === 0) {
      return res.status(400).json({ message: "tamu tidak ada" });
    }
    res.status(200).json(result[0]);
  });
};

// Status Update
const updatetamu = (req, res) => {
  const { id } = req.params;
  const {
    nama_tamu,
    no_hp,
    jabatan,
    unit_kerja,
    tujuan,
    yang_dituju,
    keterangan,
  } = req.body;
  tamu.updatetamu(
    id,
    nama_tamu,
    no_hp,
    jabatan,
    unit_kerja,
    tujuan,
    yang_dituju,
    keterangan,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json("data berhasil diupdate");
    }
  );
};

// Status Delete
const destroytamu = (req, res) => {
  const { id } = req.params;
  tamu.deletetamu(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json("Data berhasil dihapus");
  });
};

module.exports = {
  index,
  storetamu,
  showtamu,
  updatetamu,
  destroytamu,
};
