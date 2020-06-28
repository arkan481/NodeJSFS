const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { json } = require('express');


// GET METHOD
router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            "message": "error occured",
            "error": eror
        });
    }
});

// POST METHOD
router.post('/', async (req, res) => {
    // inserting to atlas
    const post = new Post({
        "title": req.body.title,
        "description": req.body.description
    });
    try {
        const reqPost = await post.save();
        res.status(200).json(reqPost);
    } catch (err) {
        res.status(500).json({
            "message": "error occured",
            "error": err
        });
    }
});

// DELETE METHOD
router.delete('/', async (req, res) => {
    // Deleting from atlas
    try {
        const post = await Post.findOneAndDelete(req.body);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({
            "message":"error occured",
            "error":error
        });
    }

});

// UPDATE METHOD
// PUT is like post you send the data through the body but this method update the entire content
router.patch('/:title',async (req,res)=>{
    try {
        const post = await Post.updateOne({"title":req.params.title},{$set:
            req.body
        });
        res.json(post);
    } catch (error) {
        res.status(500).json({
            "message":"error occured",
            "error":error
        });
    }
});

// Get specific post by the title
router.get('/:title',async(req,res)=> {
    // getting specific post
    try {
        const post = await Post.find({"title":req.params.title});
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            "message":"error occured",
            "error":error
        });
    }
});


module.exports = router;