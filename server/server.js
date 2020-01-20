
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const breweryRouter = require('./routes/brewery.router');
const imageUrlRouter = require('./routes/image-url.router');
const commentsRouter = require('./routes/comments.router');
const detailsRouter = require('./routes/details.router');
const searchBrewery = require('./routes/search.router');
const likeBrewery = require('./routes/like.router');
const emailUsers = require('./routes/email.router');
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/brewery', breweryRouter);
app.use('/api/imageurl', imageUrlRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/details', detailsRouter);
app.use('/api/search', searchBrewery);
app.use('/api/like', likeBrewery);
app.use('/api/email', emailUsers);

app.use('/s3', UploaderS3Router({
  bucket: 'jamiebucket19',
  region: 'us-east-1',
  headers: {'Access-Control-Allow-Origin': '*'},
  ACL: 'public-read',
}));

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
