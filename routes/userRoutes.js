const router = require("express").Router();
const authcontroller = require("../controllers/authController");
const userController = require("../controllers/userController");
const { requireAuth, isSupervisor } = require("../middleware/authMiddleware");

// //Auth
router.post("/register", authcontroller.signUp);
router.post("/login", authcontroller.signIn);
router.get("/logout", authcontroller.logout);
router.post("/forgotpassword", authcontroller.forgotPassword);
router.post("/resetpassword/:token", authcontroller.resetPassword);
router.post("/checkemail", authcontroller.checkEmail);

// //user db
router.get("/", [requireAuth, isSupervisor], userController.getAllUsers);
router.get("/:id", requireAuth, userController.userInfo);
router.patch("/:id", requireAuth, userController.updateUser);
// router.put("/:id", requireAuth, userController.userUpdate)
router.delete("/:id", requireAuth, userController.deleteUser);

module.exports = router;
