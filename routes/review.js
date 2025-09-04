const express = require("express");

const router=express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const{reviewSchema}= require("../schema.js");
const Listing = require("../models/listing.js");
const Review=  require("../models/review.js");

const validatereview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
   console.log(error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
///review
//Post Route
router.post("/", validatereview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  let newReview = new Review(req.body.review); 

  await newReview.save();
  listing.reviews.push(newReview._id); // push only _id if ref in schema
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
}));

// Delete route
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
     let{id}=req.params;
     let {reviewId} =req.params;
     let result=await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId} }) //also removes from the Listing
     await Review.findByIdAndDelete(reviewId)
     console.log(result);
     res.redirect(`/listings/${id}`);
     
}))

module.exports=router;