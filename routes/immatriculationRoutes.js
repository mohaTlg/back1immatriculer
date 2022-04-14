const router = require("express").Router();
const immatriculationController = require("../controllers/immatriculationController");

router.post("/", immatriculationController.createImmatriculation);

module.exports = router;
