const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({

    notifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        required: true
    },
    notified: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date : {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('notification',NotificationSchema)