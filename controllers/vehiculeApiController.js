const UserModel = require("../models/userModel");
const sequelize = require("../config/db");

// Get All Users
module.exports.getCarType = async (req, res) => {
  sequelize.query("SELECT * FROM `car_type`").then(([results, metadata]) => {
    return res
      .status(200)
      .send({ status: "success", nb: results.length, results });
  });
};

module.exports.getCarMarque = async (req, res) => {
  if (req.body.carType) {
    sequelize
      .query(
        `SELECT id_car_make,name FROM car_make WHERE id_car_type = ${req.body.carType}`
      )
      .then(([results, metadata]) => {
        return res
          .status(200)
          .send({ status: "success", nb: results.length, results });
      });
  } else {
    return res
      .status(200)
      .send({ status: "error", message: "car type ne peut pas etre null" });
  }
};

module.exports.getCarModel = async (req, res) => {
  if (req.body.carMarque) {
    sequelize
      .query(
        `SELECT id_car_model,name FROM car_model WHERE id_car_make=${req.body.carMarque}`
      )
      .then(([results, metadata]) => {
        return res
          .status(200)
          .send({ status: "success", nb: results.length, results });
      });
  } else {
    return res
      .status(200)
      .send({ status: "error", message: "car marque ne peut pas etre null" });
  }
};
module.exports.getCarGeneration = async (req, res) => {
  if (req.body.carModel) {
    sequelize
      .query(
        `   SELECT id_car_generation,name, year_begin,year_end FROM car_generation WHERE id_car_model=${req.body.carModel}`
      )
      .then(([results, metadata]) => {
        return res
          .status(200)
          .send({ status: "success", nb: results.length, results });
      });
  } else {
    return res
      .status(200)
      .send({ status: "error", message: "car model ne peut pas etre null" });
  }
};
module.exports.getCarSerie = async (req, res) => {
  if (req.body.carGeneration) {
    sequelize
      .query(
        `  SELECT id_car_serie,name  FROM car_serie WHERE id_car_generation= ${req.body.carGeneration}`
      )
      .then(([results, metadata]) => {
        return res
          .status(200)
          .send({ status: "success", nb: results.length, results });
      });
  } else {
    return res.status(200).send({
      status: "error",
      message: "car generation ne peut pas etre null",
    });
  }
};
module.exports.getCarTrim = async (req, res) => {
  if (req.body.carSerie) {
    sequelize
      .query(
        ` SELECT id_car_trim,name FROM car_trim WHERE id_car_serie=${req.body.carSerie}`
      )
      .then(([results, metadata]) => {
        return res
          .status(200)
          .send({ status: "success", nb: results.length, results });
      });
  } else {
    return res
      .status(200)
      .send({ status: "error", message: "car serie ne peut pas etre null" });
  }
};
module.exports.getCarSpecification = async (req, res) => {
  var specificationName = null;
  var specificationValue = null;

  if (req.body.carTrim) {
    await sequelize
      .query(
        `  SELECT id_car_specification_value,id_car_specification,value,unit FROM car_specification_value WHERE id_car_trim=${req.body.carTrim}`
      )
      .then(([results, metadata]) => {
        specificationValue = results;
      });
    await sequelize
      .query(`SELECT id_car_specification,name FROM car_specification `)
      .then(([results, metadata]) => {
        specificationName = results;
      });
    var result = [];
    var data = [];
    specificationValue.map((item) => {
      let t = {
        id: item.id_car_specification_value,
        name: specificationName.find(
          (element) => element.id_car_specification == item.id_car_specification
        ).name,
        value: item.value,
        unit: item.unit,
      };
      result.push(t);
    });
    return res
      .status(200)
      .send({ status: "success", nb: result.length, result });
  } else {
    return res
      .status(200)
      .send({ status: "error", message: "car trim ne peut pas etre null" });
  }
};
