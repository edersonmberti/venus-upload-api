const express = require("express");
const multer = require("multer");
const routes = express.Router();
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const uploadConfig = require("./upload");
const upload = multer(uploadConfig);

routes.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) throw "Image not found";

    const { key, location = "" } = req.file;

    const imageUri = location || `${process.env.APP_URL}/files/${key}`;

    return res.status(201).send({ imageUri, key });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

routes.delete("/:key", (req, res) => {
  const { key } = req.params;

  try {
    if (process.env.STORAGE_TYPE === "s3") {
      s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: key
      });
    } else {
      promisify(fs.unlink)(path.resolve(__dirname, "..", "uploads", key));
    }

    return res.status(200).send({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(400).send(error);
  }
});

routes.get("/", (req, res) =>
  res.status(200).send({
    message: "UHUL! The API is UP && RUNNING!!!"
  })
);

module.exports = routes;
