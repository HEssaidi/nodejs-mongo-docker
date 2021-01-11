const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const owner = new Schema({
  id: String,
  nom: String,
  prenom: String,
});
const commentaire = new Schema({
  owner: owner,
  message: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Objet = new Schema(
  {
    //id: { type: Number, required: true },
    owner: owner,
    date: { type: String },
    titre: { type: String },
    description: { type: String },
    poster: { type: String },
    langue: { type: String },
    type: { type: String },
    extention: { type: String },
    url: { type: String },
    taille: { type: String },
    discussion: [commentaire],
    reviews: [{ idUser: { type: String }, valueRat: { type: Number } }],
    rating: { type: Number, default: 0 }
  },

  { timestamps: true }
);

module.exports = mongoose.model("objet", Objet);
