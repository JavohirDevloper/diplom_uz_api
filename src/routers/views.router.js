const express = require("express");
const ViewsController = require("../controllers/views.controller");

const router = express.Router();

router.get("/views", ViewsController.getViews);
router.get("/views/:id", ViewsController.getViewsId);
router.post("/views", ViewsController.createView);
router.delete("/views/:id", ViewsController.deleteViews);

module.exports = router;
