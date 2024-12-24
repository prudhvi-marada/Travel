const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
    owneremail: {
        type: String,
        required: true,    
    },
    tourname: {
        type: String,
        required: true,    
    },
    type: {
        type: String,
        required: true, 
    }, 
    price: {
        type: String,
        required: true, 
    }, 
    vacancy: {
        type: String,
        required: true,   
    },
    image: {
        type: String, // Assuming imagePath is a string containing the path to the image file
                         // Optional: Provide a default value if no image is uploaded
      },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})


planSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

planSchema.set('toJSON', {
    virtuals: true,
});


exports.Plan = mongoose.model('Plan', planSchema);
