const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cors());
app.use(routes);

app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(process.env.PORT, () => {
  console.log("UHUL! The API is UP && RUNNING!!!", process.env.PORT);
});
