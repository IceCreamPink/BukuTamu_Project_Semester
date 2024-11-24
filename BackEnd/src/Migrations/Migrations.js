const mysql = require("mysql8");
const koneksi = require("../Models/Koneksi");
const { query } = require("express");
const konekmysql = mysql.createConnection({
  host: "localhost",
  user: "IceCreamPink",
  password: "admin123",
});

// DB USERS
const createTableUsers = (koneksi) => {
  const q = `create table if not exists users(
    id int auto_increment primary key,
    nama varchar(100),
    email varchar(100) unique,
    password varchar(100)
    )`;
  koneksi.query(q, (err, result) => {
    if (err) {
      console.error("Error tabel users", err.stack);
    }
    console.log("----------------------------");
    console.log("Table Users berhasil dibuat");
    console.log("----------------------------");
  });
};
const createTableTamu = (koneksi) => {
  const q = `create table if not exists tamu(
  id int auto_increment primary key, 
  nama_tamu varchar(100), 
  no_hp varchar(15),
  jabatan varchar(50),
  unit_kerja varchar(100),
  tujuan varchar(100), 
  yang_dituju varchar(100), 
  keterangan varchar(100),
  create_at datetime default current_timestamp,
  deleted_at datetime null
    )`;
  koneksi.query(q, (err, result) => {
    if (err) {
      console.error("Error tabel tamu", err.stack);
    }
    console.log("----------------------------");
    console.log("Table Tamu berhasil dibuat");
    console.log("----------------------------");
  });
};

const migration = () => {
  konekmysql.connect((err) => {
    if (err) {
      console.error("Error koneksi ke Databases", err.stack);
      return;
    }
    console.log("----------------------");
    console.log("Berhasil koneksi ke");
    console.log("----------------------");

    konekmysql.query(
      "create database if not exists BukuTamu_Semester",
      (err, result) => {
        if (err) {
          console.error("error koneksi ke database", err.stack);
          retrun;
        }
        console.log("--------------------------");
        console.log("Databases berhasil dibuat");
        console.log("--------------------------");

        const koneksi = require("../Models/Koneksi");
        createTableUsers(koneksi);
        createTableTamu(koneksi);
        konekmysql.end();
      }
    );
  });
};
module.exports = migration;
