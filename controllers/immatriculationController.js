const ImmatriculationModel = require("../models/immatriculationModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.createImmatriculationVA = async (req, res) => {
  var p = new Date();
  var thisMonth = p.getUTCMonth();
  var plusMois = 6;
  var DansSixMois = new Date();
  DansSixMois.setUTCMonth(thisMonth + plusMois);
  //console.log(DansSixMois);

  //console.log(db.immatriculations.stats());
  //console.log(req.body);
  let numIm = 0;
  let seriecg = "A";
  let numcg = 0;

  const allImm = await ImmatriculationModel.find({ imm_valid: true }).select(); // a revoir en fonction du mode d'exploitation

  const vaImm = await ImmatriculationModel.find({
    categorie: "VA",
    imm_valid: true,
  }).select();

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
    demandeId: req.body.dmdid,
    imm_valid: false,
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
  //console.log(req.body);
  let numIm = 0;
  let seriecg = "A";
  let numcg = 0;

  const allImm = await ImmatriculationModel.find({ imm_valid: true }).select(); // a revoir en fonction du mode d'exploitation

  const epImm = await ImmatriculationModel.find({
    categorie: "EP",
    imm_valid: true,
  }).select();

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
    demandeId: req.body.dmdid,
    imm_valid: false,
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

module.exports.valideImmatriculation = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send({ status: "error", error: "ID inconnu :" + req.params.id });
  try {
    ImmatriculationModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          imm_valid: true,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.status(200).send({ status: "success", docs });
        } else {
          return res.status(500).send({ status: "error", message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};

module.exports.singleImm = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send({ status: "error", error: "ID inconnu :" + req.params.id });
  try {
    ImmatriculationModel.findOne({ demandeId: req.params.id }, (err, docs) => {
      if (!err) return res.status(200).send({ status: "success", immat: docs });
      else return res.status(400).send({ status: "error", message: err });
    }).select();
  } catch (error) {
    return res.status(400).send({ status: "error", message: error });
  }
};
