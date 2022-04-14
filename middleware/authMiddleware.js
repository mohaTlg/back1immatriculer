const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports.checkUser = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports.requireAuth = async (req, res, next) => {
  // const token = req.cookies.jwt;
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .send({ statut: "error", message: "not authorized" });
      } else {
        const user = await UserModel.findOne({ _id: decodedToken.id }).exec();
        user.password = null;
        req.user = user;
        req.token = token;
        next();
      }
    });
  } else {
    return res.status(401).send({ status: "error", message: "not authorized" });
  }
};
module.exports.isSupervisor = async (req, res, next) => {
  if (req.user.typeOfUser === "superviseur") {
    next();
    return;
  } else {
    return res
      .status(403)
      .json({ statut: "error", message: "Le role de superviseur est requis" });
  }
};
module.exports.isInspector = async (req, res, next) => {
  if (req.user.typeOfUser === "inspecteur") {
    next();
    return;
  } else {
    return res
      .status(403)
      .json({ statut: "error", message: "Le role de inspecteur est requis" });
  }
};
module.exports.isApplicant = async (req, res, next) => {
  if (req.user.typeOfUser === "demandeur") {
    next();
    return;
  } else {
    return res
      .status(403)
      .json({ statut: "error", message: "Require demadeur Role!" });
  }
};
module.exports.isSuperAdmin = async (req, res, next) => {
  console.log(req.user.typeOfUser);
  if (
    req.user.typeOfUser === "inspecteur" ||
    req.user.typeOfUser === "superviseur"
  ) {
    next();
    return;
  } else {
    return res.status(403).json({
      statut: "error",
      message:
        "Le role du superviseur ou le inspecteur est recquis pour cette action ",
    });
  }
};
