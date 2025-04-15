const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js")

Mongo_URL="mongodb://127.0.0.1:27017/wonderlust";

main()
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect(Mongo_URL);
}

let initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner:"67f43cadf9327df2d4b7ca24",
    }));

    await Listing.insertMany(initData.data).then(()=>{
        console.log("success");
    })
    .catch((err)=>{
        console.log("error :-",err);
    })

}

initDB()