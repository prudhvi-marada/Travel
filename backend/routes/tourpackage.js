const {Tourpackage} = require('../models/tourpackage');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');
const multer = require('multer');


// Set up multer storage for storing uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


router.get(`/`,  async (req, res) =>{
    const tourList = await Tourpackage.find();

    if(!tourList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(tourList);
})


router.get(`/:id`, async (req, res) =>{
    const tourList = await Tourpackage.findById(req.params.id);

    if(!tourList) {
        res.status(500).json({success: false})
    } 
    res.send(tourList);
})


router.post('/',  async (req,res)=>{
    let tour = new Tourpackage({
        
        owneremail: req.body.owneremail,
        tourname: req.body.tourname,
        area: req.body.area,
        duration: req.body.duration,
        tourtype: req.body.tourtype,
        itinerary: req.body.itinerary,
        deparrival: req.body.deparrival,
        accdetails: req.body.accdetails,
        reportdrop: req.body.reportdrop,
        tourinfo: req.body.tourinfo

        
       
        //status: req.body.status
    })
    tour = await tour.save();

    if(!tour)
    return res.status(400).send('the tour cannot be created!')
    res.send(tour);
    
})



router.delete('/:id', auth, (req, res)=>{
    Tourpackage.findByIdAndRemove(req.params.id).then(tour =>{
        if(tour) {
            return res.status(200).json({success: true, message: 'the tour is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "tour not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})



router.put('/:id',async (req, res)=> {
    const tour = await Tourpackage.findByIdAndUpdate(
        req.params.id,
        {        
            owneremail: req.body.owneremail,
            tourname: req.body.tourname,
            area: req.body.area,
            duration: req.body.duration,
            tourtype: req.body.tourtype,
            itinerary: req.body.itinerary,
            deparrival: req.body.deparrival,
            accdetails: req.body.accdetails,
            reportdrop: req.body.reportdrop,
            tourinfo: req.body.tourinfo
        },
        { new: true}
    )

    if(!tour)
    return res.status(400).send('the tour cannot be created!')

    res.send(tour);
})




router.put('/map/:id',async (req, res)=> {
    const tour = await Tourpackage.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )

    if(!tour)
    return res.status(400).send('the tour cannot be created!')

    res.send(tour);
})



router.put('/status/:id', auth, async (req, res)=> {
    const tour = await Tourpackage.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status
        },
        { new: true}
    )

    if(!tour)
    return res.status(400).send('the tour cannot be created!')

    res.send(tour);
})





// PUT route to update the status and upload an image for a tour
router.put('/upload_image/:id', upload.single('image'), async (req, res) => {
    try {
      const tourId = req.params.id;
      //const { status, reason, remedies, notes } = req.body;
      const image = req.file ? req.file.path : undefined;
  
      // Find the tour by ID and update its status and image path
      const updatedTour = await Tourpackage.findByIdAndUpdate(
        tourId,
        { $set: {image } },
        { new: true } // To return the updated document
      );
  
      if (!updatedTour) {
        return res.status(404).json({ success: false, message: 'tour not found' });
      }
  
      res.status(200).json({ success: true, message: 'tour status and image updated successfully', tour: updatedTour });
    } catch (error) {
      console.error('Error updating tour status and image:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });




module.exports =router;