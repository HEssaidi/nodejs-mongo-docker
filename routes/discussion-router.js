const express = require("express");

const DiscussionCtrl = require("../controllers/discussion-ctrl");
const DiscussionRouter = express.Router();

DiscussionRouter.post("/commenter", DiscussionCtrl.ajouterCommentaire);
DiscussionRouter.put("/modifier", DiscussionCtrl.modifierCommentaire);
DiscussionRouter.delete(
  "/supprimer/:objet_id/:commentaire_id",
  DiscussionCtrl.supprimerCommentaire
);

module.exports = DiscussionRouter;
