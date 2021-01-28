const express = require('express');
const router = express.Router();

const User = require('../models/User');
const {registerValidation, loginValidation} = require('../helpers/validation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', async (req, res)=>{
    //Lets validate the data before we a user
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);  
    }

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send('Email or password already exists');
    }

    //Hash passwords
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })


    try {
        const savedUser = await user.save();
        res.send({user: user.id});
    } catch (error) {
        res.status(400).send(error);
    }

   
})

router.post('/login', async (req, res)=>{
    //Lets validate the data before we a user
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);  
    }

    //Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Email is not found');
    }

    //If password is correct
    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).send('Invalid password')
    }

    //Create and assign a token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);

    res.header('x-token', token).send(token);

})

module.exports = router;