const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Comment = require('../models/Comment')
const Post = require('../models/Post')

// POST /api/comments
// @desc Adds a comment
// @access Private

router.post('/', auth , async (req, res) => {

   //create the Comment
    const newComment = new Comment({
        user: req.user.id,
        post: req.body.post,
        content: req.body.content
    })
    //User.update({ _id: req.user._id }, { $addToSet : { externalids: newBook._id }}
    let post = await Post.findById(req.body.post)
    post.comments.push(newComment)
    post.save()

    const resultcomment = await newComment.save()
    res.json(resultcomment)

})





// DELETE /api/posts/:id
// @desc Delete's a user's post
// @access Private

router.delete('/:id', auth , async (req,res) => {

    const post = await Post.findById(req.params.id)

    // Check if post exists
    if(!post) {
        return res.status(404).send('Post doesn\'t exist !')
    }

    // Check if user owns the post
    if(post.user.toString() !== req.user.id ) {
        return res.status(401).send('Not authorized to delete this resource !')
    }

    else{
        await Post.findByIdAndDelete(req.params.id)
        res.send('Post deleted !')
    }
})

module.exports = router