const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/Listing.js")
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingControler = require("../controlers/listings.js");

const multer = require("multer");
const{storage} = require("../cloudConfig.js")
const upload = multer({storage})



//index route

router.get('/', wrapAsync(listingControler.index))


//new list
router.get(
    '/new',
    isLoggedIn,
    listingControler.renderNewForm)


//show route

router.get(
    '/:id',
    wrapAsync(listingControler.showListing))


//create listing

router.post(
    '/add',
    isLoggedIn, 
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.createListing)
);

//edit route

router.get(
    '/:id/edit',
    isLoggedIn,
    isOwner,
    wrapAsync(listingControler.renderEditForm)
)


router.put(
    '/:id',
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.updateListing)
)

//delete route

router.delete(
    
    '/:id',
    isLoggedIn,
    isOwner,
    wrapAsync(listingControler.destroyListing)
)

module.exports = router;

///** display by city */