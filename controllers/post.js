const express = require('express');
const router = express.Router();
const db = require('../models');


// NEW ROUTE
router.get('/newpost',(req, res) => {
    db.Redditor.find({}, (err, foundRedditors) => {
        if (err) {
            return res.send(err);
        };

        const context = {
            redditors: foundRedditors,
        };
        res.render('posts/new', context);
    });
});

// CREATE ROUTE
router.post('/', (req, res) => {

    db.Post.create(req.body, (err, createdPost) => {
        if(err){
            console.log(err);
            return res.send(err);
        }

        db.Redditor.findById(req.body.redditor, (err, foundRedditor) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            foundRedditor.posts.push(createdPost);
            foundRedditor.save();

            res.redirect('/posts');
        });
    });
})

// Show Route
router.get('/:postIndex', (req, res) => {
    // By default express will look inside the views directory when .render() is called

    db.Post.findById(req.params.postIndex, (err, onePostFromDB) => {
        if(err){
            console.log(err);
        }else{
            res.render('posts/show', {
                onePost: onePostFromDB,

            });
        }
    })

});


// index view /authors
router.get("/", function (req, res) {
    // mongoose code
    db.Post.find({}, function (error, foundPost) {
      if (error) return res.send(error);

      const context = {
        post: foundPost,
      };

      res.render("posts/index", context);
    });
});



//DELETE ROUTE
router.delete('/:i', (req, res) => {

    db.Post.findByIdAndDelete(req.params.i, (err, deletedPost) => {
        if(err){
            console.log(err)
            return res.send(err);
        }
        db.Redditor.findById(deletedPost.redditor, (err, foundRedditor) => {
            if(err){
                console.log(err);
                return res.send(err);
            }

            foundRedditor.posts.remove(deletedPost);
            foundRedditor.save();

            res.redirect('/posts');
        })
    });
});



// UPDATE ROUTE
router.put('/:i', (req, res) => {

    db.Post.findByIdAndUpdate(req.params.i, req.body, {new: true}, (err, updatedPost) => {
        if(err){
            console.log(err)
        } else {
            console.log(updatedPost);
            res.redirect(`/posts/${req.params.i}`);
        }
    })
})

//EDIT ROUTE
router.get('/:i/edit', (req, res) => {

    db.Post.findById(req.params.i, (err, onePostFromDB) => {
        if(err){
            console.log(err)
        } else{
            res.render('posts/edit.ejs', {
                onePost: onePostFromDB,
            })
        }
    })
})


module.exports = router;
