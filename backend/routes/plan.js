const {Plan} = require('../models/plan');
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


// name description mechanicname service available  locality address city mobile 

router.get(`/`,  async (req, res) =>{
    const planList = await Plan.find();

    if(!planList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(planList);
})



router.get(`/:id`, async (req, res) =>{
    const planList = await Plan.findById(req.params.id);

    if(!planList) {
        res.status(500).json({success: false})
    } 
    res.send(planList);
})


router.post('/',  async (req,res)=>{
    let plan = new Plan({
        
        owneremail: req.body.owneremail,
        tourname: req.body.tourname,
        type: req.body.type,
        price: req.body.price,
        vacancy: req.body.vacancy,   

    })
    plan = await plan.save();

    if(!plan)
    return res.status(400).send('the plan cannot be created!')
    res.send(plan);
    
})

// PUT - Update a plan by ID
router.put('/:id',async (req, res)=> {
    const plan = await Plan.findByIdAndUpdate(
        req.params.id,
        {        
            tourname: req.body.tourname,
            type: req.body.type,
            price: req.body.price,
            vacancy: req.body.vacancy, 
        },
        { new: true}
    )

    if(!plan)
    return res.status(400).send('the plan cannot be created!')

    res.send(plan);
})




// DELETE - Delete a plan by ID
router.delete('/:id', async (req, res) => {
    try {
        const planId = req.params.id;

        const plan = await Plan.findByIdAndDelete(planId);

        if (!plan)
            return res.status(404).send('Plan not found');

        res.send('Plan deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// PUT route to update the status and upload an image for a Plan
router.put('/upload_image/:id', auth, upload.single('image'), async (req, res) => {
    try {
      const planId = req.params.id;
      //const { status, reason, remedies, notes } = req.body;
      const image = req.file ? req.file.path : undefined;
  
      // Find the plan by ID and update its status and image path
      const updatedPlan = await Plan.findByIdAndUpdate(
        planId,
        { $set: {image } },
        { new: true } // To return the updated document
      );
  
      if (!updatedPlan) {
        return res.status(404).json({ success: false, message: 'Plan not found' });
      }
  
      res.status(200).json({ success: true, message: 'Plan status and image updated successfully', plan: updatedPlan });
    } catch (error) {
      console.error('Error updating Plan status and image:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });





{/*
router.post('/status/:id', auth, async (req, res)=> {
    const plan = await Plan.findByIdAndUpdate(
        req.params.id,
        {        
            status: req.body.status,
            
        },
        { new: true}
    )

    if(!plan)
    return res.status(400).send('the plan cannot be created!')

    res.send(plan);
})



router.put('/map/:id',async (req, res)=> {
    const booking = await Location.findByIdAndUpdate(
        req.params.id,
        {        
            lat: req.body.lat,
            long: req.body.long
        },
        { new: true}
    )
    if(!booking)
    return res.status(400).send('the business cannot be created!')

    res.send(booking);
})

*/}
module.exports =router;