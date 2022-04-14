const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

// Get All Users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  return res.status(200).send({ status: "success", users, nb: users.length });
};

//Info User
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send({ status: "error", error: "ID inconnu :" + req.params.id });
  try {
    UserModel.findOne({ _id: req.params.id }, (err, docs) => {
      if (!err) return res.status(200).send({ status: "success", user: docs });
      else return res.status(400).send({ status: "error", message: err });
    }).select(-"password");
  } catch (error) {
    return res.status(400).send({ status: "error", message: error });
  }
};

// Delete User
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    return res.status(200).send({
      status: "successs",
      message: "utilisateur supprimé avec succès",
    });
  } catch (err) {
    return res.status(500).send({ status: "error", message: err });
  }
};

// Update User
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ status: "error", error: "ID inconu : " + req.params.id });
  }
  try {
    console.log("REQ", req.body);
    console.log("Params", req.params);
    UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.status(200).send({
            status: "success",
            message: "information modifieé avec success",
            data: docs,
          });
        } else {
          return res.status(500).send({ status: "errror", message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};
