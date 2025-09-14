const express = require("express");

const router=express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const{reviewSchema}= require("../schema.js");
const Listing = require("../models/listing.js");
const Review=  require("../models/review.js");
const {validatereview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
///review
//Post Route
router.post("/", isLoggedIn , validatereview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  let newReview = new Review(req.body.review); 
  newReview.author=req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview._id); // push only _id if ref in schema
  await newReview.save();
  await listing.save();
  req.flash("success","New Review Created!");
  res.redirect(`/listings/${listing._id}`);
}));

// Delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
     let{id}=req.params;
     let {reviewId} =req.params;
     let result=await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId} }) //also removes from the Listing
     await Review.findByIdAndDelete(reviewId)
     console.log(result);
      req.flash("success","Review deleted!");
     res.redirect(`/listings/${id}`);
     
}))

module.exports=router;