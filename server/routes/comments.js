const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Comment = require('../models/Comment')
const Post = require('../models/Post')



// GET /api/comments
// @desc Gets a comment
// @access Private

router.get('/:id', async (req, res) => {

 
     // Gets the comment
     let comment = await Comment.findById(req.params.id).populate({path: 'user'})

     res.json(comment)
 
 })
 


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

    // Gets the commented post
    let post = await Post.findById(req.body.post)

    //Adds the comment to the post array of comments && save
    post.comments.push(newComment)
    post.save()

    //Saves the comment
    const resultcomment = await newComment.save()

  // Gets the comment
  let comment = await Comment.findById(resultcomment._id).populate({path: 'user'})

  res.json(comment)

})





// DELETE /api/comments/:id
// @desc Delete's a user's comment
// @access Private

router.delete('/:id', auth , async (req,res) => {

    const comment = await Comment.findById(req.params.id)

    // Check if comment exists
    if(!comment) {
        return res.status(404).send('Comment doesn\'t exist !')
    }

    // Check if user owns the comment
    if(comment.user.toString() !== req.user.id ) {
        return res.status(401).send('Not authorized to delete this resource !')
    }

    else{
        await Comment.findByIdAndDelete(req.params.id)
        res.send('Comment deleted !')
    }
})

module.exports = router