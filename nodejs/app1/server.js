const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    // res.json({"message": "<div style='margin:auto;width:600px;height:200px;border:1px solid #000;'> Welcome to iAssureIT API Tutorial!</div>"});
    res.json({"message": "Welcome to iAssureIT API Tutorial!"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});