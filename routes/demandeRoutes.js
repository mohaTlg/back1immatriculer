const router = require("express").Router();
const demandeController = require("../controllers/demandeController");
const { uploadImage } = require("../utils/uploadImage");
const {
  requireAuth,
  isSuperAdmin,
  isSupervisor,
  isInspector,
} = require("../middleware/authMiddleware");

//upload file in aws bucket
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
aws.config.update({
  secretAccessKey: "gZHeHq3heLztEnRH82+XmmarXk0Y/Y7ca7g5SCP3",
  accessKeyId: "AKIAXVQOLFHPGJEEDU22",
  region: "us-east-1",
});
s3 = new aws.S3();
var uploadTattoo = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cooking-test/immatriculationImage",
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

//demande route get pour le Demandeur
router.get("/me/pending", requireAuth, demandeController.getMyPendingDemande);
router.get("/me/progress", requireAuth, demandeController.getMyProgressDemande);
router.get("/me/ended", requireAuth, demandeController.getMyEndedDemande);
router.get("/me/rejected", requireAuth, demandeController.getMyRejectedDemande);
//router.get("/me/aImprimer", requireAuth, demandeController.getMyDemandeAImprimer);
router.get("/aImprimer", requireAuth, demandeController.getDemandeAImprimer);
router.get(
  "/me/generated",
  requireAuth,
  demandeController.getMyGeneratedDemande
);
router.get("/me/", requireAuth, demandeController.getMyDemande);

// create route
router.post(
  "/",
  requireAuth,
  uploadTattoo.array("files"),
  demandeController.createDemande
);
router.get("/:id", [requireAuth], demandeController.demandeInfo);
router.get("/search/:search", [requireAuth], demandeController.search);

//demande route get pour les Superviseur et inspecteur
router.get("/", [requireAuth, isSuperAdmin], demandeController.getAllDemandes);
router.get(
  "/pending",
  [requireAuth, isSuperAdmin],
  demandeController.getAllPendingDemandes
);
router.get(
  "/progress",
  [requireAuth, isSuperAdmin],
  demandeController.getAllProgressDemandes
);
router.get(
  "/ended",
  [requireAuth, isSuperAdmin],
  demandeController.getAllfinishedDemandes
);

//Les route du superviseur
router.get("/", [requireAuth, isSupervisor], demandeController.getAllDemandes);
router.get(
  "/sup/ended",
  [requireAuth, isSupervisor],
  demandeController.getAllfinishedDemandes
);
// router.get(
//   "/superviseur/progress",
//   [requireAuth, isSupervisor],
//   demandeController.getSupProgressDemandes
// );
// router.get(
//   "/superviseur/rejected",
//   [requireAuth, isSupervisor],
//   demandeController.getSupRejectedDemandes
// );

// router.get(
//   "/superviseur/ended",
//   [requireAuth, isSupervisor],
//   demandeController.getSupfinishedDemandes
// );

router.patch(
  "/progress/:id",
  [requireAuth, isSupervisor],
  demandeController.updateDemandeInProgress
);
router.patch(
  "/validate/:id",
  [requireAuth, isSupervisor],
  demandeController.validateDemande
);
router.patch(
  "/aImprimer/:id",
  [requireAuth, isSupervisor],
  demandeController.aimprimerDemande
);

router.patch(
  "/rejected/:id",
  [requireAuth, isSuperAdmin],
  demandeController.rejectDemande
);

router.patch(
  "/generate/:id",
  [requireAuth, isInspector],
  demandeController.updateDemandeInGenerated
);
router.delete(
  "/:id",
  [requireAuth, isSuperAdmin],
  demandeController.deleteDemande
);

//statistique
router.get("/me/statistique", requireAuth, demandeController.getMyStatistique);
module.exports = router;
