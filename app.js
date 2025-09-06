const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const{listingSchema}=require("./schema.js")
const Review=  require("./models/review.js");
const{reviewSchema}= require("./schema.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js")
const session=require("express-session")
const flash=require("connect-flash");
// MongoDB connection
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
const sessionOptions={
   secret:"mysupersecretcode",
   resave:false,
   saveUninitialized:true,
   cookie:{
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    }
}

// Root route
app.get("/", (req, res) => {
  res.send("Hi I am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
   res.locals.success=req.flash("success");
   res.locals.error=req.flash("error")
   next();
})
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

// Handle all other routes (404)
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("Error/error.ejs", { message });
});

// Server
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
