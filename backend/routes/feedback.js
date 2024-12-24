const {Feedback} = require('../models/feedback');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

//   useremail  name  feedback

router.get(`/`,  async (req, res) =>{
    const feedbackList = await Feedback.find();

    if(!feedbackList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(feedbackList);
})


    
router.get(`/:id`, async (req, res) =>{
    const feedbackList = await Feedback.findById(req.params.id);
    if(!feedbackList) {
        res.status(500).json({success: false})
    } 
    res.send(feedbackList);
})

router.post('/',  auth, async (req,res)=>{
    let feedback = new Feedback({
        owneremail: req.body.owneremail,
        useremail: req.body.useremail,
        tourname: req.body.tourname,
        feedbackname: req.body.feedbackname,
        feedback: req.body.feedback
    })
    feedback = await feedback.save();

    if(!feedback)
    return res.status(400).send('the feedback cannot be created!')
    res.send(feedback);
    
})





module.exports =router;