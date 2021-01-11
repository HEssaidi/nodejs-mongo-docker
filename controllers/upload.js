const uploadFile = require("../middleware/upload");
const Objet = require("../models/objets-model");
const User = require("../models/user-model");
const { use } = require("../routes/discussion-router");
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const bodyC = req.body;
    if (!bodyC) {
      return res.status(400).json({
        success: false,
        error: "You must provide a object",
      });
    }

    let id = req.body.auteur;
    console.log("id === " + id);
    let user = await User.findOne({ _id: id });
    let owner = {
      id: user._id,
      nom: user.nom,
      prenom: user.prenom,
    };

    const objet = new Objet({
      owner: owner,
      date: req.body.date,
      titre: req.body.titre,
      description: req.body.description,
      langue: req.body.langue,
      type: req.body.type,
      keywords: req.body.keywords,
      url: req.file.destination + req.file.originalname,
      taille: req.file.size,
      extention: req.body.extention,
    });

    if (!objet) {
      return res.status(400).json({ success: false, error: err });
    }

    objet
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: objet._id,
          message: "Objet created!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Objet not created!",
        });
      });

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
