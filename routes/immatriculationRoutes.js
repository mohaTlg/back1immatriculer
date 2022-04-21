const router = require("express").Router();
const immatriculationController = require("../controllers/immatriculationController");

router.get("/:id", immatriculationController.singleImm);

router.post("/va", immatriculationController.createImmatriculationVA);
router.post("/ep", immatriculationController.createImmatriculationEP);

router.patch("/immValid/:id", immatriculationController.valideImmatriculation);

module.exports = router;
