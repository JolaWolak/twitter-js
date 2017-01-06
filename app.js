'use strict';

const volleyball = require('volleyball');
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const app = express();

//app.use (morgan('dev'));
app.use(volleyball);

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.use(express.static(__dirname+'/public'));

const routesFn = require('./routes/');

const server = app.listen(3000, function () {
  console.log('twitter-js app is listening on port 3000!')
})

const io = socketio.listen(server);
app.use('/', routesFn(io));

