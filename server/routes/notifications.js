const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const Notification = require('../models/Notification')


// GET /api/notifications
// @desc Gets all user's notifications
// @access Private

router.get('/', auth , async (req,res) => {

    const notifications = await Notification.find({notified: req.user.id})
    .populate([
    {path: 'notifier' , select: 'name'},
    {path: 'notified' , select: 'name'}
])

    if(!notifications) {
        return res.status(404).send('No notifications found !')
    }
    else{
        res.json(notifications)
    }

})

// POST /api/notifications
// @desc adds a notification
// @access Private

router.post('/', auth , async (req,res) => {

    const {type,notified} = req.body

    const notification = new Notification({
        notifier: req.user.id,
        type,
        notified
    })
   
    const notif = await notification.save()
   
   res.json(notif)
  

})


module.exports = router