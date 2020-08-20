const express = require('express')
const router = express.Router()
const cloudinary = require('../utils/cloudinary')
const auth = require('../middleware/auth')
const Post = require('../models/Post')


// GET /api/posts/all
// @desc Gets all posts in DB
// @access Public

router.get('/all' , async (req,res) => {

    const posts = await Post.find()
    .populate([{path: 'user' , select: 'name'},
    {path: 'comments',populate: {
        path: 'user'
      }}])

    if(!posts) {
        return res.status(404).send('No posts in the database !')
    }
    else{
        res.json(posts)
    }



})

// GET /api/posts
// @desc Gets all user's posts
// @access Private

router.get('/', auth , async (req,res) => {

    const posts = await Post.find({user: req.user.id})
    .populate([{path: 'user' , select: 'name'},
    {path: 'comments' , select: 'content'}])

    if(!posts) {
        return res.status(404).send('No posts found !')
    }
    else{
        res.json(posts)
    }



})

// POST /api/posts
// @desc Adds a user's post
// @access Private

router.post('/', auth , async (req, res) => {


   let img_url = ""

   // upload image to cloudinary
   await cloudinary.uploader.upload(req.body.image)
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

   //create the Post 
    const newPost = new Post({
        user: req.user.id,
        title: req.body.title,
        img_url,
    })
    const resu = await newPost.save()
    res.json(resu)

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