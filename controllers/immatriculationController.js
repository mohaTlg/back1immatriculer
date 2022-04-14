const ImmatriculationModel = require("../models/immatriculationModel");

module.exports.createImmatriculation = async (req, res) => {
  const immatricul = {
    numero_immatriculation: 0001,
    numero_carte_grise: 0004024,
    date_emmission: req.body.date_emission,
    date_fin: req.body.date_fin,

    demandeId: req.demande._id.toString(),
    service: req.demande.service.toString(), // a ajouter dans la table demande
    type: req.demande.type_voiture_label.toString(),
    marque: req.demande.marque_label.toString(),

    departement: req.user.departement.toString(),
  };
};
