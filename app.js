if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const Listing = require("./models/Listing.js");
const wrapAsync = require("./utils/wrapAsync.js")

const express = require("express");
const app = express();

const mongoose = require("mongoose");
//const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
const dbUrl = process.env.ATLASDB_URL;

const ExpressError = require("./utils/ExpressError.js")

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const path = require("path");// for ejs 
app.set("view engine","ejs");//
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({extended:true}));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);

app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600
})

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err)
})

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};



main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect(dbUrl);
}

/*
app.get('/',(req,res)=>{
    res.send("working")
})*/

app.use(session(sessionOptions));   //session
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{      // flash middleWare
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.curr_user = req.user;
    next()
})

/*
app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
        email:"student@gmail.com",
        username:"delta-student"
    });

    let registeredUser = await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
})
*/
app.get('/find',wrapAsync(async(req,res)=>{
    let {city,place} = req.query;

    const results = await Listing.find({
        country: `${city}`,
        location: `${place}`
    });

    if(results.length){
        res.render("listings/filterListing.ejs",{results});
    }else{
        req.flash("error","location not found");
        res.redirect('/listing');
        
    }
   
})
)


app.use('/listing',listingRouter);//  routes listing
app.use('/listing/:id/review',reviewRouter);//  routes review
app.use('/',userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"))
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"} = err;
    //res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message})
})

app.listen('8080',(req,res)=>{
    console.log("server is listening")
})
