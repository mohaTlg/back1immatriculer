const router = require("express").Router();
const immatriculationController = require("../controllers/immatriculationController");

router.post("/va", immatriculationController.createImmatriculationVA);
router.post("/ep", immatriculationController.createImmatriculationEP);

module.exports = router;
