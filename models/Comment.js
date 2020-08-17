const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    date : {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('comment',CommentSchema)