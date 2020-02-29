module.exports = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined")
    return res.status(403).send("Access denied");

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  if (bearerToken === process.env.TOKEN) {
    next();
  } else {
    return res.status(403).send("Access denied");
  }
};
