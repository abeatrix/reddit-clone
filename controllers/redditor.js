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
router.get('/:redditorIndex', (req, res) => {
    // By default express will look inside the views directory when .render() is called

    db.Redditor.findById(req.params.redditorIndex, (err, oneRedditorFromDB) => {
        if(err){
            console.log(err);
        }else{
            res.render('redditor/show', {
                oneRedditor: oneRedditorFromDB,
        
            });
        }
    })

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
