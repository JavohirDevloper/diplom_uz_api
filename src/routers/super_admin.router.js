const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/super_admin.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

// Super admin login
router.post("/admin/login", superAdminController.SuperAdminLogin);

// Admin
router.post("/admin", isLoggedIn, superAdminController.createAdmin);
router.get("/admin", isLoggedIn, superAdminController.getAllAdmins);
router.get("/admin/:id", isLoggedIn, superAdminController.getAdminById);
router.put("/admin/:id", isLoggedIn, superAdminController.updateAdmin);
router.delete("/admin/:id", isLoggedIn, superAdminController.deleteAdmin);

module.exports = router;
