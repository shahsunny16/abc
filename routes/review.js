const express = require("express");
const router = express.Router({mergeParams:true});


const wrapAsync = require("../utils/wrapAsync.js")
const Review = require("../models/review.js");
const Listing = require("../models/Listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewControler = require("../controlers/reviews.js");

//create review

router.post(
    '/',
    isLoggedIn
    ,validateReview,
    wrapAsync(reviewControler.createReview)
)

//**delete review  */

router.delete(
    '/:reviewid',
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControler.destroyReview)
)

module.exports = router;