const DemandeModel = require("../models/demandeModel");
const ObjectID = require("mongoose").Types.ObjectId;

// Get All demandes
module.exports.getAllDemandes = async (req, res) => {
  const demandes = await DemandeModel.find().select();
  return res
    .status(200)
    .send({ status: "success", nb: demandes.length, demandes });
};
// Get All demandes en cour
module.exports.getAllPendingDemandes = async (req, res) => {
  DemandeModel.find({ etat: "en attente" }, (err, docs) => {
    if (!err)
      return res.status(200).send({ status: "success", demandes: docs });
    else return res.status(400).send({ status: "error", message: err });
  }).select();
};
module.exports.getAllProgressDemandes = async (req, res) => {
  DemandeModel.find({ etat: "en cours" }, (err, docs) => {
    if (!err)
      return res.status(200).send({ status: "success", demandes: docs });
    else return res.status(400).send({ status: "error", message: err });
  }).select();
};
module.exports.getAllfinishedDemandes = async (req, res) => {
  DemandeModel.find({ etat: "valider" }, (err, docs) => {
    if (!err)
      return res.status(200).send({ status: "success", demandes: docs });
    else return res.status(400).send({ status: "error", message: err });
  }).select();
};

// // Superviseur
// module.exports.getSupfinishedDemandes = async (req, res) => {
//   DemandeModel.find(
//     { etat: "valider", by_superviseur: req.user._id },
//     (err, docs) => {
//       if (!err)
//         return res.status(200).send({ status: "success", demandes: docs });
//       else return res.status(400).send({ status: "error", message: err });
//     }
//   ).select();
// };
// module.exports.getSupRejectedDemandes = async (req, res) => {
//   DemandeModel.find(
//     { etat: "rejeter", by_superviseur: req.user._id },
//     (err, docs) => {
//       if (!err)
//         return res.status(200).send({ status: "success", demandes: docs });
//       else return res.status(400).send({ status: "error", message: err });
//     }
//   ).select();
// };

//  recuperer les  demandes en pending  d'un demandeur
module.exports.getMyPendingDemande = async (req, res) => {
  var demandes = [null];
  if (req.user.typeOfUser == "demandeur") {
    demandes = await DemandeModel.find({
      by: req.user._id.toString(),
      etat: "en attente",
    }).select();
  } else if (req.user.typeOfUser == "superviseur") {
    demandes = await DemandeModel.find({
      etat: "en attente",
    }).select();
  }
  // else if (req.user.typeOfUser == "superviseur") {
  //   demandes = await DemandeModel.find({
  //     etat: "valider",
  //   }).select();
  // }
  return res
    .status(200)
    .send({ status: "success", nb: demandes.length, demandes });
};
module.exports.getMyProgressDemande = async (req, res) => {
  if (req.user.typeOfUser === "demandeur") {
    DemandeModel.find({ etat: "en cours", by: req.user._id }, (err, docs) => {
      if (!err)
        return res.status(200).send({ status: "success", demandes: docs });
      else return res.status(400).send({ status: "error", message: err });
    }).select();
  } else if (req.user.typeOfUser === "superviseur") {
    DemandeModel.find(
      { etat: "en cours", by_superviseur: req.user._id },
      (err, docs) => {
        if (!err)
          return res.status(200).send({ status: "success", demandes: docs });
        else return res.status(400).send({ status: "error", message: err });
      }
    ).select();
  }
};
//  recuperer les  demandes en ended  d'un demandeur
module.exports.getMyEndedDemande = async (req, res) => {
  const demandes = [];
  if (req.user.typeOfUser === "demandeur") {
    const demandes = await DemandeModel.find({
      by: req.user._id.toString(),
      etat: "valider",
    }).select();
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  } else if (req.user.typeOfUser == "superviseur") {
    const demandes = await DemandeModel.find({
      by_superviseur: req.user._id.toString(),
      etat: "valider",
    }).select();
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  } else if (req.user.typeOfUser == "inspecteur") {
    const demandes = await DemandeModel.find({
      etat: "valider",
    }).select();
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  } else {
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  }
};
//  recuperer les  demandes en ended  d'un demandeur
module.exports.getMyRejectedDemande = async (req, res) => {
  const demandes = await DemandeModel.find({
    by: req.user._id.toString(),
    etat: "rejeter",
  }).select();
  return res
    .status(200)
    .send({ status: "success", nb: demandes.length, demandes });
};
//  recuperer les  demandes en pending  d'un demandeur
module.exports.getMyDemande = async (req, res) => {
  const demandes = await DemandeModel.find({
    by: req.user._id.toString(),
  }).select();
  return res
    .status(200)
    .send({ status: "success", nb: demandes.length, demandes });
};
module.exports.getMyGeneratedDemande = async (req, res) => {
  const demandes = [];
  if (req.user.typeOfUser === "demandeur") {
    const demandes = await DemandeModel.find({
      by: req.user._id.toString(),
      etat: "approuver",
    }).select();
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  } else if (req.user.typeOfUser == "superviseur") {
    const demandes = await DemandeModel.find({
      by_superviseur: req.user._id.toString(),
      etat: "approuver",
    }).select();
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  } else if (req.user.typeOfUser == "inspecteur") {
    const demandes = await DemandeModel.find({
      // by_inspecteur: req.user._id.toString(),
      etat: "approuver",
    }).select();
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  } else {
    return res
      .status(200)
      .send({ status: "success", nb: demandes.length, demandes });
  }
};

//Info Demande
module.exports.demandeInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send({ status: "error", error: "ID inconnu :" + req.params.id });
  try {
    DemandeModel.findOne({ _id: req.params.id }, (err, docs) => {
      if (!err)
        return res.status(200).send({ status: "success", demande: docs });
      else return res.status(400).send({ status: "error", message: err });
    }).select();
  } catch (error) {
    return res.status(400).send({ status: "error", message: error });
  }
};
//Create demade
module.exports.createDemande = async (req, res) => {
  var tmp = [];
  if (req.files) {
    req.files.forEach(async (file) => {
      if (file !== null) {
        let img = {
          url: file.location,
        };
        tmp.push(img);
      }
    });
  }
  const demande = {
    type_demande: req.body.type_demande,
    type_piece_identite: req.body.type_piece_identite,
    numero_piece_identite: req.body.numero_piece_identite,
    titre: req.body.titre,
    nom_proprietaire: req.body.nom_proprietaire,
    profession: req.body.profession,
    nationalite: req.body.nationalite,
    telephone: req.body.telephone,
    email: req.body.email,
    region: req.body.region,
    prefecture: req.body.prefecture,
    commune: req.body.commune,
    quartier: req.body.quartier,
    type_voiture: req.body.type_voiture,
    type_voiture_label: req.body.type_voiture_label,
    marque: req.body.marque,
    marque_label: req.body.marque_label,
    model: req.body.model,
    model_label: req.body.model_label,
    generation: req.body.generation,
    generation_label: req.body.generation_label,
    serie: req.body.serie,
    serie_label: req.body.serie_label,
    specification: req.body.specification,
    specification_label: req.body.specification_label,
    date: req.body.date,
    lieu_livraison: req.body.lieu_livraison,
    pays_origine: req.body.pays_origine,
    date_premier_mise_circulation: req.body.date_premier_mise_circulation,
    date_immatriculation_precedent: req.body.date_immatriculation_precedent,
    numero_immatriculation_precedent: req.body.numero_immatriculation_precedent,
    mode_exploitation: req.body.mode_exploitation,
    numero_de_chassis: req.body.numero_de_chassis,
    code: req.body.code,
    numero_orange: req.body.numero_orange,
    montant: req.body.montant,
    type_plaque: req.body.type_plaque,
    emboutisseur: req.body.emboutisseur,

    images: tmp,
    by: req.user._id.toString(),
  };
  try {
    const demandes = await DemandeModel.create(demande);
    return res.status(201).json({
      status: "success",
      message: "demande crée avec succes",
      demandes,
    });
  } catch (err) {
    return res.status(400).send({ status: "error", message: err });
  }
};
// Delete Demande
module.exports.deleteDemande = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  try {
    await DemandeModel.deleteOne({ _id: req.params.id }).exec();
    return res.status(200).send({
      status: "successs",
      message: "utilisateur supprimé avec succès",
    });
  } catch (err) {
    return res.status(500).send({ status: "error", message: err });
  }
};

// modifier les demande (en cours)
module.exports.updateDemandeInProgress = async (req, res) => {
  console.log("user", req.user);
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ status: "error", error: "ID inconu : " + req.params.id });
  }
  try {
    DemandeModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          etat: "en cours",
          by_superviseur: req.user._id.toString(),
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.status(200).send({ status: "success", docs });
        } else {
          return res.status(500).send({ status: "errror", message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};
// modifier les demande (en cours)
module.exports.validateDemande = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ status: "error", error: "ID inconu : " + req.params.id });
  }

  try {
    DemandeModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          etat: "valider",
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.status(200).send({ status: "success", docs });
        } else {
          return res.status(500).send({ status: "errror", message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};

// Rejeter une demande
module.exports.rejectDemande = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ status: "error", error: "ID inconu : " + req.params.id });
  }
  try {
    if (req.user.typeOfUser === "superviseur") {
      DemandeModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            etat: "rejeter",
            by_superviseur: req.user._id,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) {
            return res.status(200).send({ status: "success", docs });
          } else {
            return res.status(500).send({ status: "errror", message: err });
          }
        }
      );
    } else if (req.user.typeOfUser === "inspecteur") {
      DemandeModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            etat: "rejeter",
            by_inspecteur: req.user._id,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) {
            return res.status(200).send({ status: "success", docs });
          } else {
            return res.status(500).send({ status: "errror", message: err });
          }
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};
// modifier les demande (en traite)
module.exports.updateDemandeInEnded = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ status: "error", error: "ID inconu : " + req.params.id });
  }

  try {
    DemandeModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          etat: "valider",
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.status(200).send({ status: "success", docs });
        } else {
          return res.status(500).send({ status: "errror", message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};

module.exports.updateDemandeInGenerated = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ status: "error", error: "ID inconu : " + req.params.id });
  }
  try {
    DemandeModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          etat: "generer",
          by_inspecteur: req.user._id.toString(),
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.status(200).send({ status: "success", docs });
        } else {
          return res.status(500).send({ status: "errror", message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};

module.exports.getMyStatistique = async (req, res) => {
  if (req.user.typeOfUser === "demandeur") {
    let demandeProgress = await DemandeModel.find({
      etat: "en cours",
      by: req.user._id,
    });
    let demandePending = await DemandeModel.find({
      etat: "en attente",
      by: req.user._id,
    });
    let demandeValider = await DemandeModel.find({
      etat: "valider",
      by: req.user._id,
    });
    let demandeRejeter = await DemandeModel.find({
      etat: "rejeter",
      by: req.user._id,
    });
    let demandeApprouver = await DemandeModel.find({
      etat: "approuver",
      by: req.user._id,
    });
    return res.status(200).send({
      status: "succes",
      data: {
        demandeEnAttente: demandePending.length,
        demandeEnCours: demandeProgress.length,
        demandeValider: demandeValider.length,
        demandeRejeter: demandeRejeter.length,
        demandeApprouver: demandeApprouver.length,
      },
    });
  } else if (req.user.typeOfUser === "superviseur") {
    let demandeProgress = await DemandeModel.find({
      etat: "en cours",
      by_superviseur: req.user._id,
    });
    let demandePending = await DemandeModel.find({
      etat: "en attente",
      by_superviseur: req.user._id,
    });
    let demandeValider = await DemandeModel.find({
      etat: "valider",
      by_superviseur: req.user._id,
    });
    let demandeRejeter = await DemandeModel.find({
      etat: "generer",
      by_superviseur: req.user._id,
    });
    let demandeApprouver = await DemandeModel.find({
      etat: "approuver",
      by_superviseur: req.user._id,
    });
    return res.status(200).send({
      status: "succes",
      data: {
        demandeEnAttente: demandePending.length,
        demandeEnCours: demandeProgress.length,
        demandeValider: demandeValider.length,
        demandeRejeter: demandeRejeter.length,
        demandeApprouver: demandeApprouver.length,
      },
    });
  } else if (req.user.typeOfUser == "inspecteur") {
    let demandeProgress = await DemandeModel.find({
      etat: "en cours",
    });
    let demandePending = await DemandeModel.find({
      etat: "en attente",
    });
    let demandeValider = await DemandeModel.find({
      etat: "valider",
    });
    let demandeRejeter = await DemandeModel.find({
      etat: "generer",
    });
    let demandeApprouver = await DemandeModel.find({
      etat: "approuver",
    });
    return res.status(200).send({
      status: "succes",
      data: {
        demandeEnAttente: demandePending.length,
        demandeEnCours: demandeProgress.length,
        demandeValider: demandeValider.length,
        demandeRejeter: demandeRejeter.length,
        demandeApprouver: demandeApprouver.length,
      },
    });
  }
};

module.exports.search = (req, res) => {
  console.log("PARAMS", req.params.search);
  try {
    DemandeModel.findOne(
      { numero_piece_identite: req.params.search },
      (err, docs) => {
        if (!err)
          return res.status(200).send({ status: "success", demande: docs });
        else return res.status(400).send({ status: "error", message: err });
      }
    ).select();
  } catch (error) {
    return res.status(400).send({ status: "error", message: error });
  }
};
