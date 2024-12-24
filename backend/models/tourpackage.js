const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    owneremail: {
        type: String,
        required: true,    
    },
    tourname: {
        type: String,   
        required: true,    
    },
    area: {
        type: String,
        required: true,  
    },
    duration: {
        type: String,
        required: true,    
    },
    tourtype: {
        type: String,
        required: true,    
    },
    itinerary: {
        type: String,
        required: true,    
    },

    deparrival: {
        type: String,
        required: true,    
    },
    accdetails: {
        type: String,
        required: true,    
    },
    reportdrop: {
        type: String,
        required: true,    
    },
    tourinfo: {
        type: String,
        required: true,    
    },


    // price: {
    //     type: String,
    //     required: true,    
    // },
    image: {
         type: String, // Assuming imagePath is a string containing the path to the image file
         default: ''                        // Optional: Provide a default value if no image is uploaded
       },
    status:{
        type: String,
        default:'Pending'
    },
    lat: {
        type: Number,  
        default: 0,         
    },
    long: {
        type: Number,
        default: 0,   
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


tourSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

tourSchema.set('toJSON', {
    virtuals: true,
});


exports.Tourpackage = mongoose.model('Tourpackage', tourSchema);
