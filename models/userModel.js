const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 155,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 155,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "image par defaut",
    },
    token: {
      type: String,
      default: null,
    },
    typeOfUser: {
      type: String,
      enum: ["demandeur", "", "inspecteur", "superviseur"],
      default: "demandeur",
    },
    phoneNumber: {
      type: String,
    },
    departement: {
      type: String,
    },
    emailValidate: {
      type: Boolean,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

// play function before save user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    if (user.emailValidate === false) {
      throw Error("Invalide email");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      user.password = "";
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
// userSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   // Hash token (private key) and save to database
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   // Set token expire date
//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
//   return resetToken;
// };

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
