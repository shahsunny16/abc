const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const geoSchema = new Schema({
    
    geometryy: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
});

module.exports = mongoose.model("GeoJsan",geoSchema);

