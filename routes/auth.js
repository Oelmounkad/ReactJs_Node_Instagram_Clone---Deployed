const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const config = require('config')
const auth = require('../middleware/auth')


// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/',auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})


// @route   POST api/auth
// @desc    Auth user & get token
// @access  Pulic
router.post('/',[
    check('email','Please include a valid email')
    .isEmail(),
    check('password','Password is required')
    .exists()
], async (req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    
    const {email, password} = req.body 
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg: 'Invalid password'})

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

module.exports = router