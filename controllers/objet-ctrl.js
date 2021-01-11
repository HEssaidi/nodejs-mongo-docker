const Objet = require("../models/objets-model");

updateObjet = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Objet.findOne({ _id: req.params.id }, (err, objet) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Objet not found!",
      });
    }
    objet.date = body.date;
    objet.titre = body.titre;
    objet.description = body.description;
    objet.poster = body.poster;
    objet.langue = body.langue;
    objet.type = body.type;
    objet.extention = body.extention;
    objet.url = body.url;
    objet.taille = body.taille;

    objet
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: objet._id,
          message: "Objet updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Objet not updated!",
        });
      });
  });
};

deleteObjet = async (req, res) => {
  await Objet.findOneAndDelete({ _id: req.params.id }, (err, objet) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!objet) {
      return res.status(404).json({ success: false, error: `Objet not found` });
    }

    return res.status(200).json({ success: true, data: objet });
  }).catch((err) => console.log(err));
};

getObjetById = async (req, res) => {
  await Objet.findOne({ _id: req.params.id }, (err, objet) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!objet) {
      return res.status(404).json({ success: false, error: `Objet not found` });
    }
    return res.status(200).json({ success: true, data: objet });
  }).catch((err) => console.log(err));
};

getObjets = async (req, res) => {
  await Objet.find({}, (err, objets) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!objets.length) {
      return res
        .status(404)
        .json({ success: false, error: `Objets not found` });
    }
    return res.status(200).json({ success: true, data: objets });
  }).catch((err) => console.log(err));
};


updateRating = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Objet.findOne({ _id: req.params.id }, (err, objet) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Objet not found!',
      })
    }



    const query = { _id: req.params.id };


    var testid = 0
    var e = 0
    var id
    objet.reviews.forEach(element => {
      if (element.idUser === body.idUser) {
        testid = 1
        id = element.idUser
        e = element._id
        console.log("fghjklmljhbhjklkjhb")
      }

    });

    if (testid) {
      update11 = { $set: { "reviews.$.valueRat": body.valueRat } }
      const q = { _id: req.params.id, "reviews.idUser": id };
      //console.log("id_reviex"+ element._id)
      Objet.updateOne(q, update11)

        .then(() => {

          console.log("pass1")

        })
        .catch(error => {
          return res.status(404).json({
            error,
            message: 'Objet not updated!',
          })
        })
    }
    else {
      update12 = { $addToSet: { reviews: [{ idUser: body.idUser, valueRat: body.valueRat }] } }
      Objet.updateOne(query, update12)

        .then(() => {

          console.log("pass1")

        })
        .catch(error => {
          return res.status(404).json({
            error,
            message: 'Objet not updated!',
          })
        })
    }

    var total = 0
    var result = 0


    objet.reviews.forEach(element => {
      total += element.valueRat
    });


    result = ((total * 1.0) + (body.valueRat)) / (objet.reviews.length + 1)
    console.log("le total est" + total)
    console.log("le lenth" + objet.reviews.length)
    console.log("le resultat   " + result)
    console.log("le  value" + body.valueRat)
    const update2 = { $set: { rating: result } }

    Objet.updateOne(query, update2)
      .then(() => {
        return res.status(200).json({
          success: true,
          id: objet._id,
          message: 'Objet updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Objet not updated!',
        })
      })
  })
}

module.exports = {
  updateObjet,
  deleteObjet,
  getObjets,
  updateRating,
  getObjetById,
};


