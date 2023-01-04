const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const config = require('config')
const cloudinary = require('../utils/cloudinary')

const auth = require('../middleware/auth')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',async (req,res) => {

    
    const {name, fullname, email, password} = req.body 

    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg: 'User already exists'})
        }
        let img_url = ""

        if(req.body.profile_pic){

        const fileStr = req.body.profile_pic;
         await cloudinary.uploader.upload(fileStr)
        .then((result) => {
            // Recuperate the url of the image stored
          img_url = result.secure_url
          console.log('image url : '+img_url)
        })
        .catch((error) => {
          res.status(500).send({
            message: "failure",
            error,
          })
        })
}
     


        user = new User({
            name,
            fullname,
            email,
            password,
            profile_pic:img_url
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'), {
            expiresIn: 3600000
        },
        (err,token) => {
            if(err) throw err;
            res.json({token})

        }
        )

    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
        
    }

})



// @route   POST api/users
// @desc    Gets a user
// @access  Public
router.get('/:id' , async (req,res) => { 

    const user = await User.findById(req.params.id).select('-password')
    if(!user){
        return res.status(404).json({msg: 'User doesn\'t exist'})
    }else{
        res.json(user)
    }


} )



// @route   PUT api/users/:id
// @desc    Edits a user's profile
// @access  Private
router.put('/:id' , auth , async (req,res) => { 

try {
    let user = await User.findById(req.params.id)
    const {name,fullname,bio,email,website,phone} = req.body
    const modifications = {}

    if(name) modifications.name = name
    if(fullname) modifications.fullname = fullname
    if(bio) modifications.bio = bio
    if(email) modifications.email = email
    if(website) modifications.website = website
    if(phone) modifications.phone = phone

    if(!user){
        return res.status(404).json({msg: 'User doesn\'t exist'})
    }
    else{

        let img_url = ""

        if(req.body.profile_pic){

        const fileStr = req.body.profile_pic;
         await cloudinary.uploader.upload(fileStr)
        .then((result) => {
            // Recuperate the url of the image stored
          img_url = result.secure_url

          modifications.profile_pic = img_url
        })
        .catch((error) => {
          res.status(500).send({
            message: "failure",
            error,
          })
        })
}

        // Update the profile
    user = await User.findByIdAndUpdate(req.params.id,
        {$set : modifications},
        {new: true})

        res.json(user)
    } 
} catch (err) {
    console.log(err)
}
   


} )

module.exports = router