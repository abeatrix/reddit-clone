const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./models');
const path = require('path');
const controllers = require('./controllers');
const methodOverride = require('method-override');


// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.originalUrl}`)
    next();
})

app.set('view engine', 'ejs')

app.use('/redditor', controllers.redditor);



// SERVER LISTENER
app.listen(PORT, function(){
    console.log(`server up and running on PORT ${PORT}`)
})
