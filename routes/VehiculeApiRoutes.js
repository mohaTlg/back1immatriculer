const router = require("express").Router();
const vehiculeApiController = require("../controllers/vehiculeApiController");
const { requireAuth, isSupervisor } = require("../middleware/authMiddleware");

router.get("/getcartype", requireAuth, vehiculeApiController.getCarType);
router.post("/getcarmarque", requireAuth, vehiculeApiController.getCarMarque);
router.post("/getcarmodel", requireAuth, vehiculeApiController.getCarModel);
router.post(
  "/getcargeneration",
  requireAuth,
  vehiculeApiController.getCarGeneration
);
router.post("/getcarserie/", requireAuth, vehiculeApiController.getCarSerie);
router.post("/getcartrim", requireAuth, vehiculeApiController.getCarTrim);
router.post(
  "/getcarspecification",
  requireAuth,
  vehiculeApiController.getCarSpecification
);

module.exports = router;
