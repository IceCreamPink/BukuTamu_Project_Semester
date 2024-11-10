const express = require("express");
const bodyperser = require("body-parser");
const migration = require("./Migrations/Migrations");
const route = require("./Routers/Router");
const cors = require("cors")

const app = express();
const port = 3000;

migration();
app.use(cors())
app.use(bodyperser.json());
app.use("/api", route);

app.listen(port, () => {
  console.log("-----------------------");
  console.log(`Berhasil di port ${port}`);
  console.log("-----------------------");
});
