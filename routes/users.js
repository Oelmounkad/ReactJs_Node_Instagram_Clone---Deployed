const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const config = require('config')
const cloudinary = require('../utils/cloudinary')
const { json } = require('express')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',[
    check('name','Please Name is required')
    .not()
    .isEmpty(),
    check('email','Please include a valid email')
    .isEmail(),
    check('password','Please enter a password with 6 or more characters')
    .isLength({min: 6})
],async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    
    const {name, email, password} = req.body 

    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg: 'User already exists'})
        }

            // Upload user image
        let img_url = ""

        // upload image to cloudinary
        await cloudinary.uploader.upload(req.body.profile_pic)
        .then((result) => {
            // Recuperate the url of the image stored
          img_url = result.secure_url
        })
        .catch((error) => {
          res.status(500).send({
            message: "failure",
            error,
          })
        })


        user = new User({
            name,
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
        console.error(err.message)
        res.status(500).send('Server error')
        
    }

})


router.get('/:id' , async (req,res) => { 

    const user = await User.findById(req.params.id).select('-password')
    if(!user){
        return res.status(404).json({msg: 'User doesn\'t exist'})
    }else{
        res.json(user)
    }


} )

module.exports = router