const express=require("express");
const app=express();
const path = require("path");

// const cookieParser=require("cookie-parser")

// app.use(cookieParser("newsecretcode"));
const session=require("express-session");
const flash=require("connect-flash")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}


app.use(session(sessionOptions));
app.use(flash());
app.get("/test",(req,res)=>{
    res.send("test successful!");
});
// app.get("/getCookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("namaste","india");
//     res.send("sent you some cookies!")
// })
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("color","red",{signed: true});
//      res.cookie("newyork","US",{signed: true});
//     res.send("done");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified!")

// })

// app.get("/greet",(req,res)=>{
//     let {name ="Anonymous"}=req.cookies;
//     res.send(`Hi ${name}`)

// })
// app.get("/",(req,res)=>{
//     console.dir(req.cookies)
//     res.send("Hi i am root")
    
// })

app.use((req,res,next)=>{
   res.locals.msg=req.flash("success");
    res.locals.err=req.flash("error");
    next();
})
app.get("/register",(req,res)=>{
    
    let{name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    

    res.render("page.ejs",{name: req.session.name})
})

app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`you sent a request ${req.session.cou} times`)
})

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})