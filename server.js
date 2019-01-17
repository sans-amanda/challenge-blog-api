const express = require("express");
// we'll use morgan to log the HTTP layer
const morgan = require("morgan");
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require("body-parser");

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
const blogPostsRouter = require("./blogPostsRouter");
const app = express();

// log the http layer
app.use(morgan('common'));
app.use(express.json());

// app.use routes requests to /blogPostsRouter
// to the blogPostsRouter const
app.use('/blogPostsRouter', blogPostsRouter);

// app.listen
app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });