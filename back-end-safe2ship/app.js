// Web server config
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');

// load .env data into process.env
require("dotenv").config();

const PORT = process.env.API_PORT || 8080;

const cors = require('cors');
app.use(cors());
app.options('*', cors());

// const corsConfig = {
//   credentials: true,
//   origin: "http://localhost:3000",
// };
// app.use(cors(corsConfig));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.header('origin') );
//   next();
// });


//---------------------------------------------------------

// PG database client/connection setup
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session')

app.use(express.json());
// -- app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))  // override with POST having ?_method=DELETE


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(logger('dev'));

// -- app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//---------------------------------------------------------

//websocket config
const http = require('http');
const server = http.createServer(app);
const websocket = require('./websocket/websocket.js')
      websocket({server})

// --------------------------------------------------

// Separated Routes for each Resource
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const packagesRouter = require('./routes/packages');
const messagesRouter = require('./routes/messages');
const ordersRouter = require('./routes/orders');
const reviewsRouter = require('./routes/reviews');

// --------------------------------------------------

// Mount all resource routes
app.use('/', indexRouter); // home page

// APIs
app.use('/api', usersRouter(dbHelpers));
app.use('/api', packagesRouter(dbHelpers));
app.use('/api', messagesRouter(dbHelpers));
app.use('/api', ordersRouter(dbHelpers));
app.use('/api', reviewsRouter(dbHelpers));

// --------------------------------------------------

server.listen(PORT, () => {
  console.log(`safe2ship is listening on port ${PORT}`);
});


module.exports = websocket;