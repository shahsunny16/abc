const { types } = require("joi");
const Listing = require("../models/Listing");
const opencage = require('opencage-api-client');
const GeoJsan = require("../models/geoJson");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm = (req,res)=>{
    //console.log("jii")
    res.render("listings/new.ejs");
}

module.exports.showListing =  async (req,res)=>{
    let{id} = req.params;
    const idData = await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author"
        },
    })
    .populate("owner");

    if(!idData){
        req.flash("error","listing you visit does not exist!");
        res.redirect('/listing')
    }
    res.render("listings/show.ejs",{idData});
   // console.log(idData);
}

module.exports.createListing = async (req,res,next)=>{

    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;// current user info.
    newListing.image = {url,filename};
    
    await newListing.save()
    console.log(newListing)
    req.flash("success","new listing created!");
    res.redirect('/listing');
}

module.exports.renderEditForm =  async (req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested does not exist!");
        res.redirect('/listing')
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = listing.image.url.replace("/upload","/upload/,w_250")
    
    res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.updateListing =  async (req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});

    if(typeof req.file !== "undefined"){

        let url = req.file.path;
        let  filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }

    req.flash("success","listing updated!");
    res.redirect(`/listing/${id}`);
}

module.exports.destroyListing = async (req,res)=>{

    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    res.redirect('/listing');

}