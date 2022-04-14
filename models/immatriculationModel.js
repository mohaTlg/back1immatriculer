const mongoose = require("mongoose");

const ImmatriculationSchema = new mongoose.Schema(
  {
    demandeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Demande",
      require: true,
    },
    numero_immatriculation: {
      type: Number,
      required: true,
    },
    numero_carte_grise: {
      type: Number,
      required: true,
    },
    date_emmission: {
      type: String,
      required: true,
    },
    date_fin: {
      type: String,
      required: true,
    },
    /*departement: {
      // le departement de l'utilsateur
      type: String,
      trim: true,
      maxlength: 10000,
    },
    service: {
      // l'utilisateur va entrer le service
      type: String,
      trim: true,
      maxlength: 10000,
    },
    type: {
      // voiture ou moto
      type: String,
      trim: true,
      maxlength: 10000,
    },
    marque: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    model: {
      type: String,
      trim: true,
      maxlength: 10000,
    },
    numero_chassis: {
      type: String,
      trim: true,
    },
    numero_moteur: {
      type: String,
    },
    pa: {
      type: String,
    },*/
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("immatriculation", ImmatriculationSchema);
