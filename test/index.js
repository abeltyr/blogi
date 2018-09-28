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

describe("list a blog with the id specific id", function() {
  it("should return a json with one blog along the comments and like and writer of it", function(done) {
    // todo make a request to get a single blog with its id
    done();
  });
});
// create a new blog
describe("create a new blog", function() {
  it("should return the newly created blog and should", function() {
    // todo create the new blog if a user is authenticated and return the newly created blog
  });
});

// update a blog with an id

describe("update a blog", function() {
  it("should return the updated blog if the user is authenticated and the blog is written by the same user", function() {
    // todo update the blog with the given id
  });
});

// delete a blog
describe("delete a blog", function() {
  it("should return a bool if the blog with the id is deleted", function() {
    // delete a blog with the given id
  });
});

//follow a category
describe("follow a category", function() {
  it("should ", function() {
    // todo be successful if a user is authenticated
  });
});

//follow a user
describe("follow a user", function() {
  it("should ", function() {
    // todo be successful if user is authenticate
  });
});

//like a blog
describe("like a blog", function() {
  it("should return a json with a message attribute ", function() {
    // todo like a blog with a specific id by the authenticated user
  });
});

// unlike a blog
describe("unlike a blog", function() {
  it("should unlike a blog and the count of likes for that blog is reduced by one", function() {
    // todo unlike a blog by the authenticated user
  });
});

// add to read-letter for authenticated user
describe("add to read-latter", function() {
  it("should add to the authenticated users read-latter", function() {
    // todo
  });
});
