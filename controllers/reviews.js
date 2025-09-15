const Review=  require("../models/review.js");
const Listing=require("../models/listing.js");

module.exports.commentOnListing=async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  let newReview = new Review(req.body.review); 
  newReview.author=req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview._id); // push only _id if ref in schema
  await newReview.save();
  await listing.save();
  req.flash("success","New Review Created!");
  res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteComment=async(req,res)=>{
     let{id}=req.params;
     let {reviewId} =req.params;
     let result=await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId} }) //also removes from the Listing
     await Review.findByIdAndDelete(reviewId)
     console.log(result);
      req.flash("success","Review deleted!");
     res.redirect(`/listings/${id}`);
     
};