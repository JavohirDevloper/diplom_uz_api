const express = require("express");
const ReviewsController= require("../controllers/reviews.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();


router.get("/reviews",isLoggedIn,  ReviewsController.getReviews)
router.get("/reviews/:id",isLoggedIn,  ReviewsController.getReviewById)
router.post("/reviews", isLoggedIn, ReviewsController.createReviews)
router.put("/reviews/:id", isLoggedIn, ReviewsController.updateReviewById)
router.delete("/reviews/:id", isLoggedIn, ReviewsController.deleteReviewsById)
module.exports = router;
