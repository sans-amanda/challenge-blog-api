
const express = require("express");
const router = express.Router();

const {BlogPosts} = require('./models');

// add blog posts to BlogPosts
// so there's some data to look at
BlogPosts.create(
    "Blog Title 1", "blog content bla blah blah", "John Smith");
BlogPosts.create(
    "Blog Title 2", "blog content bla blah blah", "Jane Doe");
BlogPosts.create(
    "Blog Title 3", "blog content bla blah blah", "Will Turner");

// GET -> /blog-posts
// when a get request is made to /blog-posts
// our app responses by serializing (tranform to JSON)
// the data returned by BlogPosts.get()
router.get("/blog-posts", (req, res) => {
    res.json(BlogPosts.get());
});

// POST -> /blog-posts
app.post("/blog-posts", jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author"];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(item);
  });

// DELETE -> /blog-posts/:id
app.delete("/blog-posts/:id", (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post \`${req.params.title}\``);
    res.status(204).end();
  });

//PUT -> /blog-posts/:id
app.put('/blog-posts/:id', jsonParser, (req, res) => {
    const requiredFields = ["title", "content", "author"];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog post \`${req.params.id}\``);
    BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });
    res.status(204).end();
  });