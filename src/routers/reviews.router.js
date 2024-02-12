const express = require("express");
const ReviewsController= require("../controllers/reviews.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 10, 
  message: "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.get("/reviews",isLoggedIn, limiter, ReviewsController.getReviews)
router.get("/reviews/:id",isLoggedIn,limiter,  ReviewsController.getReviewById)
router.post("/reviews", isLoggedIn,limiter, ReviewsController.createReviews)
router.put("/reviews/:id", isLoggedIn,limiter, ReviewsController.updateReviewById)
router.delete("/reviews/:id", isLoggedIn,limiter, ReviewsController.deleteReviewsById)
module.exports = router;
