const mongoose = require("mongoose");
const Listing = require("../models/Listing.js");
const listing = require("../models/Listing.js");

Mongo_URL="mongodb://127.0.0.1:27017/wonderlust";

main()
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect(Mongo_URL);
}

async function find(){
   
    //let res = await Listing.find({country:"United States"})
    //console.log(res);

    let city = 'United States';
    let place = 'awadhpuri';

    const results = await Listing.find({
        country: city,
        location: place
    });

   console.log(results);
}
find();