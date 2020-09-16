const express = require('express');
const router = express.Router();
const db = require('../models');


// NEW ROUTE
router.get('/newpost',(req, res) => {
    res.render('posts/newpost');
});

// CREATE ROUTE
router.post('/', (req, res) => {

    db.Post.create(req.body, (err, createdPost) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/posts');
        }
    })

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

    db.Redditor.findByIdAndDelete(req.params.i, (err, deletedRedditor) => {
        if(err){
            console.log(err)
        } else {
            console.log(deletedRedditor);
            res.redirect('/redditor');
        }
    })
})


//EDIT ROUTE
router.get('/:i/edit', (req, res) => {

    db.Redditor.findById(req.params.i, (err, oneRedditorFromDB) => {
        if(err){
            console.log(err)
        } else{
            res.render('redditor/edit.ejs', {
                oneRedditor: oneRedditorFromDB,
            })
        }
    })
})

// UPDATE ROUTE
router.put('/:i', (req, res) => {

    db.Redditor.findByIdAndUpdate(req.params.i, req.body, {new: true}, (err, updatedRedditor) => {
        if(err){
            console.log(err)
        } else {
            console.log(updatedRedditor);
            res.redirect(`/redditor/${req.params.i}`);
        }
    })
})



module.exports = router;
