const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js")

const upload=multer({storage});

// Index & Create
router.route("/")
    .get(wrapAsync(listingController.index)) // Index route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)); // Create route
    

// New form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update & Delete
router.route("/:id")
    .get(wrapAsync(listingController.showListing)) // Show route
    .patch(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) // Update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete route

// Edit form
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;
