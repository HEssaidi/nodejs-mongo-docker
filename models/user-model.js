const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },

  prenom: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
