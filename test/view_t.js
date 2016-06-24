'use strict';

var Promise = global.Promise || require('promise');

var express = require('express'),
    path = require('path'),
    exphbs  = require('express-handlebars');

var app = express();

var hbs = exphbs.create({
    defaultLayout: '',
    extname:'.tpl',
    partialsDir: [
        '../server/views/includes',
        '../server/views/layout'
    ]
});

app.engine('tpl', hbs.engine);
app.set('view engine', 'tpl');
app.set('views', path.join(__dirname, '../server/views/pages/'));

app.get('/', function (req, res) {
    res.render('home/index', {
        title: 'Home'
    });
});

app.use(express.static('../public/'));

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});