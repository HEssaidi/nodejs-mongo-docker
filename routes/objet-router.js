const express = require("express");

const ObjetCtrl = require("../controllers/objet-ctrl");
const uploadController = require("../controllers/upload");
const router = express.Router();

router.post("/upload", uploadController.upload);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);

router.put("/objet/:id", ObjetCtrl.updateObjet);
router.delete("/objet/:id", ObjetCtrl.deleteObjet);
router.get("/objet/:id", ObjetCtrl.getObjetById);
router.get("/objets", ObjetCtrl.getObjets);

router.put('/rating/:id', ObjetCtrl.updateRating)

module.exports = router;
