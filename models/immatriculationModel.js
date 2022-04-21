const mongoose = require("mongoose");

const ImmatriculationSchema = new mongoose.Schema(
  {
    demandeId: {
      type: mongoose.Schema.Types.ObjectId,
      //type: String,
      //   require: true,
    },
    numero_immatriculation: {
      type: Number,
      required: true,
    },
    numero_carte_grise: {
      type: Number,
      required: true,
    },
    serie_carte_grise: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
    date_expiration: {
      type: Date,
    },
    imm_valid: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("immatriculation", ImmatriculationSchema);
