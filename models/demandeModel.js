const mongoose = require("mongoose");

const DemandeSchema = new mongoose.Schema(
  {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    type_demande: {
      type: String,
      required: true,
    },
    type_piece_identite: {
      type: String,
      required: true,
    },
    numero_piece_identite: {
      type: String,
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    nom_proprietaire: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    nationalite: {
      type: String,
    },
    telephone: {
      type: String,
    },
    email: {
      type: String,
    },
    region: { type: String },
    prefecture: { type: String },
    commune: { type: String },
    quartier: { type: String },
    type_voiture: {
      type: String,
    },
    type_voiture_label: {
      type: String,
    },
    marque: {
      type: String,
    },
    marque_label: {
      type: String,
    },
    model: {
      type: String,
    },
    model_label: {
      type: String,
    },
    generation: {
      type: String,
    },
    generation_label: {
      type: String,
    },
    serie: {
      type: String,
    },
    serie_label: {
      type: String,
    },
    specification: {
      type: String,
    },
    specification_label: {
      type: String,
    },
    date: {
      type: String,
    },
    lieu_livraison: {
      type: String,
    },
    pays_origine: {
      type: String,
    },
    date_premier_mise_circulation: {
      type: String,
    },
    date_immatriculation_precedent: {
      type: Date,
    },
    numero_immatriculation_precedent: {
      type: String,
    },
    mode_exploitation: {
      type: String,
    },
    numero_de_chassis: {
      type: String,
    },
    code: {
      type: String,
    },
    numero_orange: {
      type: String,
    },
    montant: {
      type: String,
    },
    type_plaque: {
      type: String,
    },
    emboutisseur: {
      type: String,
    },

    
    libelle: {
      type: String,
    },
    genre: {
      type: String,
    },
    etat_voiture: {
      type: String,
    },
    nombre_de_place_assis: {
      type: String,
    },
    nombre_de_place_debout: {
      type: String,
    },
    cylindre: {
      type: String,
    },
    pv: {
      type: String,
    },
    cu: {
      type: String,
    },
    ptra: {
      type: String,
    },
    ptac: {
      type: String,
    },
    puissance_admin: {
      type: String,
    },
    carrossserie: {
      type: String,
    },
    couleur: { type: String },
    type_couleur: {
      type: String,
      enum: ["clair", "fonce"],
    },
    source_energie: {
      type: String,
    },
    etat: {
      type: String,
      enum: ["en attente", "en cours", "valider", "rejeter", "approuver"],
      default: "en attente",
    },
    by_superviseur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    by_inspecteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    images: {
      type: [
        {
          url: { type: String },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("demande", DemandeSchema);
