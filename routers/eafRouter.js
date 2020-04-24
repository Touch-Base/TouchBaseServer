const router = require("express").Router();
var cloudinary = require("cloudinary");

// THIS FILE AND ROUTE IS FOR EAF IMAGES ONLY

cloudinary.config({
  cloud_name: "eaf-custom-decks-and-remodelling",
  api_key: "854826875142675",
  api_secret: "7aBR8BwY5yl2-3ezm4s6_DH21Qg",
});

router.get("/get", (req, res) => {
  cloudinary.v2.search
    .expression("resource_type:image AND folder=eaf_images")
    .sort_by("public_id", "desc")
    .execute()
    .then((result) => res.status(201).json(result))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
