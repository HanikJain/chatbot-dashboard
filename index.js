const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const courseRouter = require('./routes/course/course')

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// CORS
app.use(cors({
    origin: 'http://localhost:3001'
}));



// routes
app.use(courseRouter);

app.get('/', (req, res) => {
    res.send("Hello world")
})



PORT = process.env.PORT || 5001;


mongoose.connect("mongodb://0.0.0.0:27017/chatbotDB")
    .then(result => {
        app.listen(PORT, function () {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        throw new Error(err);
    })