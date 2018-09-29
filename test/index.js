const chai = require("chai"),
  chaiHTTP = require("chai-http");

chai.use(chaiHTTP);

let expect = chai.expect;

// list all blog

describe("list all blog", function() {
  it("should return a json with the list of all blog in db", done => {
    chai
      .request("http://localhost:3000")
      .get("/api/blog/all")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// list all blog by title

describe("list all blog by title", function() {
  it("should return a json with the list of all blog in db with the title give in the params ", done => {
    chai
      .request("http://localhost:3000")
      .get("/api/blog/all/Title/:title")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// list all blog by Category

describe("list all blog by Category", function() {
  it("should return a json with the list of all blog in db with the Category give in the params ", done => {
    chai
      .request("http://localhost:3000")
      .get("/api/blog/all/Category/:category")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// show the selected blog writer likes comment and the blog

describe("list a blog with the id specific id", function() {
  it("should return a json with one blog along the comments and like and writer of it", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/api/blog/e61bca26-7281-4726-817a-b59543db7637")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// show all blogs written by the user

describe("list of blog written by the user of the specific id", function() {
  it("should return a json with all blog written by a specific user", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/api/blog/User/20d3418e-1f53-4b52-94f1-d7d929dc39ca")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// create a new blog

describe("create a new blog", function() {
  it("should return the newly created blog and should", function() {
    // todo create the new blog if a user is authenticated and return the newly created blog
    chai
      .request("http://localhost:3000")
      .post("/api/blog/New")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// update a blog with an id

describe("update a blog", function() {
  it("should return the updated blog if the user is authenticated and the blog is written by the same user", function() {
    // todo update the blog with the given id
    chai
      .request("http://localhost:3000")
      .put("/api/blog/Update/e61bca26-7281-4726-817a-b59543db7637")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// delete a blog
describe("delete a blog", function() {
  it("should return a bool if the blog with the id is deleted", function() {
    // delete a blog with the given id
    chai
      .request("http://localhost:3000")
      .delete("/api/blog/Delete/e61bca26-7281-4726-817a-b59543db7637")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

//follow a category

describe("follow a category", function() {
  it("should ", function() {
    // todo be successful if a user is authenticated
    chai
      .request("http://localhost:3000")
      .post("/api/feedback/Follow/Category")
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// //follow a user
// describe("follow a user", function () {
//   it("should ", function () {
//     // todo be successful if user is authenticate
//   });
// });

// //like a blog
// describe("like a blog", function () {
//   it("should return a json with a message attribute ", function () {
//     // todo like a blog with a specific id by the authenticated user
//   });
// });

// // unlike a blog
// describe("unlike a blog", function () {
//   it("should unlike a blog and the count of likes for that blog is reduced by one", function () {
//     // todo unlike a blog by the authenticated user
//   });
// });

// // add to read-letter for authenticated user
// describe("add to read-latter", function () {
//   it("should add to the authenticated users read-latter", function () {
//     // todo
//   });
// });
