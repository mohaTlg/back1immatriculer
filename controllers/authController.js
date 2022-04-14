const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { signupErrors } = require("../utils/customeError");
const sendEmail = require("../utils/sendEmail");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
//
module.exports.signUp = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  };
  try {
    const data = await UserModel.create(user);
    await sendValidateLink(email, data._id);
    return res
      .status(201)
      .send({ status: "success", message: "utilisateur creer avec success" });
  } catch (err) {
    return res.status(400).send({ status: "error", message: err });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    await UserModel.login(email, password)
      .then((data) => {
        const token = createToken(data._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        return res.status(200).send({ status: "success", user: data, token });
      })
      .catch((err) => {
        console.log("err", err.Message);
        return res.status(400).send({
          status: "error",
          message:
            "Email ou mot de passe incorrect veuillez-vous inscrire , si c'est deja le cas verifie votre mail pour le valider",
        });
      });
  } catch (err) {
    return res.status(400).send({ status: "error", message: err });
  }
};

module.exports.logout = (req, res) => {
  // res.cookie("x-access-token", "", { maxAge: 1 });

  res.redirect("/");
};
module.exports.checkEmail = (req, res) => {
  if (req.body.token) {
    jwt.verify(
      req.body.token,
      process.env.TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .send({ statut: "error", message: "not authorized" });
        } else {
          const user = await UserModel.findOne({ _id: decodedToken.id }).exec();
          UserModel.findOneAndUpdate(
            { _id: user._id.toString() },
            {
              $set: {
                emailValidate: true,
              },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
              if (!err) {
                return res
                  .status(200)
                  .send({ status: "success", message: "email valide" });
              } else {
                return res.status(500).send({ status: "errror", message: err });
              }
            }
          );
        }
      }
    );
  } else {
    return res.status(401).send({ status: "error", message: "not authorized" });
  }
};
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  let user = await UserModel.findOne({ email: email });
  if (!user) {
    return res
      .status(400)
      .send({ status: "error", message: "email non enregistrer" });
  }
  try {
    const resetToken = createToken(user._id);
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
    const message = `
      <h1>Cliquez sur le lien pour modifier votre mot de passe </h1>
      <p> plus de description de la tâche </p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      await sendEmail({
        to: email,
        subject: "lien pour modifier votre mot de passe  ",
        text: message,
      });
      UserModel.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            token: resetToken,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) {
            return res.status(200).send({
              status: "success",
              message:
                "Veuillez consulter vos mail pour renitialiser votre mot de passe",
            });
          } else {
            return res.status(500).send({
              status: "errror",
              message: "erreur veuillez recommencer",
            });
          }
        }
      );
    } catch (err) {
      return res
        .status(500)
        .send({ status: "error", message: "erreur veuillez recommencer" });
    }
  } catch (err) {
    next(err);
  }
};
exports.resetPassword = async (req, res) => {
  var user;
  jwt.verify(
    req.params.token,
    process.env.TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        return res
          .status(400)
          .send({ status: "error", message: "Le token n'est pas valide" });
      } else {
        user = await UserModel.findById(decodedToken.id);
        if (!user) {
          return res
            .status(400)
            .send({ status: "error", message: "Le token n'est pas valide" });
        }
        if (user.token === req.params.token) {
          UserModel.findById(user._id, async (err, doc) => {
            if (err) {
              return res.status(200).send({
                status: "error",
                message: doc,
              });
            }
            doc.password = req.body.password;
            doc.token = null;
            await doc.save();

            return res.status(400).send({
              status: "success",
              message: "mot de passe modifier avec success",
            });
          });
        } else {
          return res.status(400).send({
            status: "error",
            message: "Le token n'est pas valide",
          });
        }
      }
    }
  );
};

const sendValidateLink = async (email, id) => {
  try {
    const resetToken = createToken(id);
    const resetUrl = `${process.env.CLIENT_URL}/checkemail/${resetToken}`;
    const message = `
      <h1>Cliquez sur le lien pour valider votre email</h1><br/>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a> `;
    try {
      await sendEmail({
        to: email,
        subject: "lien pour Valider votre mail ",
        text: message,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
