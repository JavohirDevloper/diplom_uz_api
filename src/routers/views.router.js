const express = require("express");
const ViewsController = require("../controllers/views.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

const router = express.Router();

router.get("/views", isLoggedIn, ViewsController.getViews);
router.get("/views/:id", isLoggedIn, ViewsController.getViewsId);
router.post("/views", isLoggedIn, ViewsController.createView);
router.delete("/views/:id", isLoggedIn, ViewsController.deleteViews);

module.exports = router;
