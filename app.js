const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js")
const path=require("path");
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate");
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}



app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"))
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")))
app.get("/",(req,res)=>{
    res.send("Hi I am root")
})
app.get("/listings",async (req,res)=>{
    const allListings =await Listing.find({})
    res.render("listings/index",{allListings})
})

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});

app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body);
    await newListing.save();
    res.redirect("/listings")
})

//edit route
app.get("/listings/:id/edit" , async(req,res)=>{
    let { id }=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs" ,{ listing })
})

app.patch("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body);
    res.redirect(`/listings/${id}`)

})


//show route
app.get("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    res.render("listings/show.ejs" ,{listing})
})

app.delete("/listings/:id", async(req,res)=>{
      let {id}=req.params;
      await Listing.findByIdAndDelete(id);
      res.redirect("/listings")
})


// get new form



// app.get("/testListings",async (req,res)=>{
//    let sampleListing=new Listing({
//       title:"my new villa",
//       description:"by the beach",
//       price:1200,
//       location:"calangute,Goa",
//       country:"India"
//    })
//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("successful testing")
// })
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})