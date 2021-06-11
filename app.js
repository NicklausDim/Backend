const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const connectDB = require('./config/db');
const contacts = require('./router/contacts');
const auth = require('./router/auth');
const authMid = require('./middleware/auth');
const publicView = require('./router/publicViews');
const hbs = require('hbs');
const publicRoutes = require('./router/public');

const port = process.env.PORT || 8080;

connectDB();

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());

app.engine('html', hbs.__express);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
    next();
}

app.use(allowCrossDomain);

app.use('/contacts', authMid.checkAuth, contacts);
app.use('/auth', auth);
app.use('/pages', publicView);
app.use('/', publicRoutes);

app.listen(port, () => console.log(`Server started to run on ${port}`));