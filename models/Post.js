const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    img_url : { 
         type: String,
         required: true
         },
    location:{
         type: String,
         required: false
         },
    likes: {
        type: Number,
        default: 0
    },
    likers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'comment' }
    ],
    date : {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('post',PostSchema)