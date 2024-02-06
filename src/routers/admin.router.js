const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

router.post("/admin/register", adminController.registerAndLoginAdmin);
router.post("/admin/login", adminController.loginAdmin);
// Admin yaratish
router.post("/admin", isLoggedIn, adminController.createAdmin);
router.get("/admin", isLoggedIn, adminController.getAdmins);
router.get("/admin/:id", isLoggedIn, adminController.getAdminById);
router.put("/admin/:id", isLoggedIn, adminController.updateAdmin);
router.delete("/admin/:id", isLoggedIn, adminController.deleteAdmin);

module.exports = router;
