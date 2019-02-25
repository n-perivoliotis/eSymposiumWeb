const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const symposiumRouter = require('./routes/symposiumRoutes'); // Imports routes for the users

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/eSymposiumDb';
const mongoDB = dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/eSymposium', symposiumRouter);
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/views')));

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
