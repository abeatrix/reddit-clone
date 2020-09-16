const express = require('express');
const router = express.Router();
const db = require('../models');


// NEW ROUTE
router.get('/newuser',(req, res) => {
    res.render('redditor/newuser');
});

// CREATE ROUTE
router.post('/', (req, res) => {

    db.Redditor.create(req.body, (err, createdRedditor) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/redditor');
        }
    })
})

// Show Route
router.get('/:i', (req, res) => {
    // By default express will look inside the views directory when .render() is called

    db.Redditor.findById(req.params.i).populate('posts').exec((err, oneRedditorFromDB) => {
        if(err){
            console.log(err);
            return res.send(err);
        }
        const context = {oneRedditor: oneRedditorFromDB};
            res.render('redditor/show', context);
    });
});



// index view /authors
router.get("/", function (req, res) {
    // mongoose code
    db.Redditor.find({}, function (error, foundRedditor) {
        if (error) return res.send(error);

    const context = {
        redditor: foundRedditor,
    };

    res.render("redditor/index", context);
    });
});



//DELETE ROUTE
router.delete('/:i', (req, res) => {

    db.Redditor.findByIdAndDelete(req.params.i, (err, deletedRedditor) => {
        if(err){
            console.log(err)
            return res.send(err)
        }
        db.Post.remove({redditor: deletedRedditor._id}, (err, removedPosts) => {
            if(err){
                console.log(err);
                return res.send(err);
            }
            res.redirect('/posts')
        });
    });
});


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
