// const multer = require("multer");
// exports.UploadImage = (name) => {
//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // cb(null, "./images/" + name);
//       cb(null, "./client/build/images/" + name);
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   });
//   return storage;
// };

//upload file in aws bucket
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
aws.config.update({
  secretAccessKey: "baf4FpQmpSRlBF+SoOSYxV8H7Bnha+9TwScxvgXO",
  accessKeyId: "AKIAXVQOLFHPEAFCZEZ2",
  region: "us-east-1",
});
s3 = new aws.S3();
exports.uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cooking-test/demandeImage",
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});
