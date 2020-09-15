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

    db.Movie.findByIdAndDelete(req.params.i, (err, deletedRedditor) => {
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

    db.Movie.findById(req.params.i, (err, oneRedditorFromDB) => {
        if(err){
            console.log(err)
        } else{
            res.render('edit.ejs', {
                oneRedditor: oneRedditorFromDB,
            })
        }
    })
})

// UPDATE ROUTE
router.put('/:i', (req, res) => {

    db.Movie.findByIdAndUpdate(req.params.i, req.body, {new: true}, (err, updatedRedditor) => {
        if(err){
            console.log(err)
        } else {
            console.log(updatedRedditor);
            res.redirect(`/redditor/${req.params.i}`);
        }
    })
})



module.exports = router;
