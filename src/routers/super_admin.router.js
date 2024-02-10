const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/super_admin.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

// admin login
router.post("/admin/login", AdminController.AdminLogin);

// Admin
router.post("/admin", isLoggedIn, AdminController.createAdmin);
router.get("/admin", isLoggedIn, AdminController.getAllAdmins);
router.get("/admin/:id", isLoggedIn, AdminController.getAdminById);
router.put("/admin/:id", isLoggedIn, AdminController.updateAdmin);
router.delete("/admin/:id", isLoggedIn, AdminController.deleteAdmin);

module.exports = router;
