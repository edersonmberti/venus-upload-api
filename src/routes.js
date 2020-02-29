const express = require("express");
const multer = require("multer");
const router = express.Router();

const uploadConfig = require("./upload");
const upload = multer(uploadConfig);

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) throw "Image not found";

    const { key, location = "" } = req.file;

    const imageUri = location || `${process.env.APP_URL}/files/${key}`;

    return res.status(201).send({ imageUri });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/", (req, res) =>
  res.status(200).send({
    message: "UHUL! The API is UP && RUNNING!!!"
  })
);

module.exports = router;
