const ImmatriculationModel = require("../models/immatriculationModel");

module.exports.createImmatriculation = async (req, res) => {
  //console.log(db.immatriculations.stats());
  let numcg = 0;
  let numIm = 0;
  let seriecg = "A";

  const allImm = await ImmatriculationModel.find().select(); // a revoir en fonction du mode d'exploitation
  numcg = allImm.length + 1;

  numIm = allImm.length + 1;
  //numIm = 100099;

  if (numIm > 19998) {
    numIm = numIm - 19998;
    seriecg = "C";
  } else if (numIm > 9999) {
    numIm = numIm - 9999;
    seriecg = "B";
  }

  const immatricul = {
    numero_immatriculation: numIm,
    numero_carte_grise: numcg,
    serie_carte_grise: seriecg,
    categorie: "VA",
    //$inc: { numero_carte_grise: 1 },
  };

  try {
    const immatriculation = await ImmatriculationModel.create(immatricul);
    return res.status(201).json({
      status: "success",
      message: "immatriculation faite avec succes",
      immatriculation,
    });
  } catch (err) {
    return res.status(400).send({ status: "error", message: err });
  }
};
