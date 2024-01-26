const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authoraizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authoraizeRole("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authoraizeRole("admin"), getSingleUser);
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authoraizeRole("admin"), updateUserRole);
router  
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authoraizeRole("admin"), deleteUser);

module.exports = router;
