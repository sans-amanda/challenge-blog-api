// import chai, declare expect variable
const chai = require("chai");
const chaiHttp = require("chai-http");

// declare a variable for expect from chai import
const expect = chai.expect;

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {app, runServer, closeServer} = require("../server");


chai.use(chaiHttp);




describe("Blog Post", function() {
    // Before our tests run, we activate the server. Our `runServer`
    // function returns a promise, and we return the promise by
    // doing `return runServer`. If we didn't return a promise here,
    // there's a possibility of a race condition where our tests start
    // running before our server has started.
    before(function() {
        return runServer();
    });

    // Close server after these tests run in case
    // we have other test modules that need to 
    // call `runServer`. If server is already running,
    // `runServer` will error out.
    after(function() {
        return closeServer();
    });

    // note there's no `done` parameter passed to `function()` below
    it("should list blog posts on GET", function() {
        // since we're returning `chai.request.get.then...`
        // we don't need a `done` call back
        return chai.request(server)
            .get("/blog-posts")
            .then(function(res) {
                expect(res).to.have.status(200);
                // check other stuff
                expect(res).to.be.json;
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.above(0);
                res.body.forEach(function(item) {
                    expect(item).to.be.a("object");
                    expect(item).to.have.all.keys(
                        "id",
                        "title",
                        "content",
                        "author",
                        "publishDate"
                    );
                });
            });
    });

    it("should add blog post on POST", function() {
        const testPost = {
            title: "title test",
            content: "content test",
            author: "author test"
        };
        return chai.request(app)
            .post("blog-posts")
            .send(testPost)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys("title", "name", "author");
                expect(res.body.id).to.not.equal(null);
                expect(res.body.title).to.equal(testPost.title);
                expect(res.body.title).to.equal(testPost.content);
                expect(res.body.title).to.equal(testPost.author);
                expect(res.body).to.deep.equal(Object.assign(testPost, {id: res.body.id}));
            });
    });

    it("should update blog posts on PUT", function() {
        return chai.request(app)
            .get("blog-posts")
            .then(function(res){
                const updateTest = {title: "title update test"};
                return chai.request(app)
                    .put(`/shopping-list/${updateTest.id}`)
                    .send(updateTest)
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                expect(res.body).to.deep.equal(updateTest);
            });
    });

    it('should delete blog posts on DELETE', function() {
        return chai.request(app)
          // first have to get so we have an `id` of item
          // to delete
            .get('/blog-posts')
            .then(function(res) {
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`);
            })
            .then(function(res) {
                expect(res).to.have.status(204);
            });
        });
});