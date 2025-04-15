const Listing = require("../models/Listing");
const Review = require("../models/review")


module.exports.createReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    review.author = req.user._id;

    listing.reviews.push(review);

    await review.save()
    await listing.save()
    req.flash("success","review created!");
    res.redirect(`/listing/${listing.id}`)
}

module.exports.destroyReview = async(req,res)=>{

    let {id,reviewid} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","review deleted!");
    res.redirect(`/listing/${id}`);
}