const koneksi = require("../Models/Koneksi");
const express = require("express");
const xlsxjs = require("exceljs");

const xlsxUser = async (req, res) => {
  try {
    koneksi.query("select * from users", async (err, results) => {
      if (err) {
        console.error("Tidak bisa mengambil data dari databases");
        return res.status(500).json({ message: "Gagal mengambil data" });
      }

      let workbook = new xlsxjs.Workbook();
      const sheet = workbook.addWorksheet("Books");

      sheet.columns = [
        { header: "Nama", key: "nama", width: 20 },
        { header: "Email", key: "email", width: 20 },
      ];

      results.forEach((row) => {
        sheet.addRow(row);
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attcahment; filename=user.xlsx");

      await workbook.xlsx.write(res);
      res.end();
    });
  } catch {}
};

const xlsxTamu = async (req, res) => {
  try {
    koneksi.query(
      "SELECT * FROM tamu where deleted_at is null",
      async (err, results) => {
        if (err) {
          console.error("Tidak bisa mengambil data dari databases");
          return res.status(500).json({ message: "Gagal mengambil data" });
        }

        let workbook = new xlsxjs.Workbook();
        const sheet = workbook.addWorksheet("Books");

        sheet.columns = [
          //  varchar(100),
          //    varchar(100),
          //    varchar(100),
          //    varchar(100),
          //    enum('kepala_sekolah','waka_kurikulum','waka_humas','waka_sapras','kaprodi_akutansi','kaprodi_bd','kaprodi_dkv','kaprodi_mp','kaprodi_rpl'),
          //    varchar(100),
          //   keterangan varchar(100),
          { header: "Nama", key: "nama", width: 20 },
          { header: "Nomer HP", key: "nohp", width: 20 },
          { header: "Jabatan", key: "jabatan", width: 20 },
          { header: "Asal Unit Kerja", key: "unit_kerja", width: 20 },
          { header: "Unit Kerja Tujuan", key: "tujuan", width: 20 },
          { header: "Nama Yang Dituju", key: "yang_dituju", width: 20 },
          { header: "Keterangan", key: "keterangan", width: 20 },
          { header: "Tanggal Pengisian", key: "create_at", width: 15 },
        ];

        results.forEach((row) => {
          sheet.addRow(row);
        });

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attcahment; filename=tamu.xlsx");

        await workbook.xlsx.write(res);
        res.end();
      }
    );
  } catch {}
};
module.exports = { xlsxUser, xlsxTamu };
