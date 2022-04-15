const ImmatriculationModel = require("../models/immatriculationModel");

module.exports.createImmatriculationVA = async (req, res) => {
  var p = new Date();
  var thisMonth = p.getUTCMonth();
  var plusMois = 6;
  var DansSixMois = new Date();
  DansSixMois.setUTCMonth(thisMonth + plusMois);
  console.log(DansSixMois);

  //console.log(db.immatriculations.stats());
  let numIm = 0;
  let seriecg = "A";
  let numcg = 0;

  const allImm = await ImmatriculationModel.find().select(); // a revoir en fonction du mode d'exploitation

  const vaImm = await ImmatriculationModel.find({ categorie: "VA" }).select();

  numcg = allImm.length + 1;

  numIm = vaImm.length + 1;
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
    date_expiration: DansSixMois,
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

module.exports.createImmatriculationEP = async (req, res) => {
  //console.log(db.immatriculations.stats());
  let numIm = 0;
  let seriecg = "A";
  let numcg = 0;

  const allImm = await ImmatriculationModel.find().select(); // a revoir en fonction du mode d'exploitation

  const epImm = await ImmatriculationModel.find({ categorie: "EP" }).select();

  numcg = allImm.length + 1;

  numIm = epImm.length + 1;
  //numIm = 10003;

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
    categorie: "EP",
    //date_expiration: new Date() + 1,
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
