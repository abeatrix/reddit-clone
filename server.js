const express = require('express');
const app = express();

const PORT = 4000;

// SERVER LISTENER
app.listen(PORT, function(){
    console.log(`server up and running on PORT ${PORT}`)
})
