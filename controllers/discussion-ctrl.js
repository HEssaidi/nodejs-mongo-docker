const Objet = require("../models/objets-model");
const User = require("../models/user-model");

ajouterCommentaire = async (req, res) => {
  try {
    let { objet_id, user_id, message } = req.body;

    let user = await User.findOne({ _id: user_id });

    let owner = {
      id: user._id,
      nom: user.nom,
      prenom: user.prenom,
    };
    let commentaire = {
      owner: owner,
      message: message,
    };

    await Objet.findOneAndUpdate(
      { _id: objet_id },
      {
        $push: {
          discussion: commentaire,
        },
      }
    );
    res.json({
      success: 1,
      message: "votre commentaire a été ajouter",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

modifierCommentaire = async (req, res) => {
  try {
    let { objet_id, commentaire_id, message } = req.body;
    // console.log("id objet == " + id_objet);

    Objet.update(
      { "discussion._id": commentaire_id },
      {
        $set: {
          "discussion.$.message": message,
        },
      },
      function (err, model) {
        if (err) {
          return res.send(err);
        }
        return res.json({
          success: 1,
          message: "votre commentaire a été modifier",
        });
      }
    );

    // let objet = await Objet.findById(id_objet);
    // res.json(objet);
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

supprimerCommentaire = async (req, res) => {
  try {
    // let { objet_id, commentaire_id } = req.params.objet_id;
    // const post = await Post.findById(req.params.postId);
    console.log(
      "id objet == " +
      req.params.objet_id +
      " id commentaire == " +
      req.params.commentaire_id
    );
    // let objet = await Objet.findOne({ _id: objet_id });
    // console.log(objet);
    Objet.findByIdAndUpdate(
      req.params.objet_id,
      { $pull: { discussion: { _id: req.params.commentaire_id } } },
      function (err, model) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        return res.json({
          success: 1,
          message: "votre commentaire a été supprimer",
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  ajouterCommentaire,
  modifierCommentaire,
  supprimerCommentaire,
};
