// its middleware ,koi bhi route call ho phle y call hoga


const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const Listing = require("./models/Listing.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; //its a property in req,->
        //-> (its a path)jaha user jana chahta tha
        req.flash("error","you must be logged in to create listing")
        res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next)=>{

    let{id} = req.params;
    let listing = await Listing.findById(id);
    
    if(!listing.owner.equals(res.locals.curr_user._id)){
        req.flash("error","permission denied!");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) =>{
    let{error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}


module.exports.validateReview = (req,res,next)=>{
    let{error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next()
    }
}

module.exports.isReviewAuthor = async (req,res,next)=>{

    let{id,reviewid} = req.params;
    console.log(reviewid)

    let newReview = await Review.findById(reviewid);

    console.log(newReview)
    console.log(newReview.author)

    if(!newReview.author.equals(res.locals.curr_user._id)){
        req.flash("error","you are not the author of this review!");
        return res.redirect(`/listing/${id}`);
    }
    next();
}