const chai = require("chai"),
  chaiHTTP = require("chai-http");

chai.use(chaiHTTP);

let expect = chai.expect;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2ZDIxMDVmLTUzZjEtNGQ0OC04YWY5LWI4NTQzNmZmNTdkYSIsImdvb2dsZV9pZCI6IjExMDEwMjg4MjU3ODU4NTAxOTI1MCIsImZ1bGxfbmFtZSI6IkFiZWwgTGFtZXNnZW4iLCJpbWFnZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tY0JwLVc5cjlSb00vQUFBQUFBQUFBQUkvQUFBQUFBQUFBQkEvWVRiODc3NDNkcW8vcGhvdG8uanBnP3N6PTUwIiwiZW1haWwiOiJhYmVsbGFtZXNnZW4yMUBnbWFpbC5jb20iLCJpc3N1ZWRfZGF0ZSI6IjIwMTgtMDktMjlUMTA6NDI6MTMuNjgzWiIsImV4cGlyZWRfZGF0ZSI6IjIwMTgtMDktMjlUMTY6NDI6MTMuNjgzWiIsImlhdCI6MTUzODIxNzczM30.TjgJSdfxzg1ynjug4bT67PXdQ_CszWC45lipt7xgzAU";
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
      .get("/api/blog/4f3c00ac-319a-4c02-93a9-31c8c02dc91f")
      .end(function(err, res) {
        expect(res.status).to.be.equal(404);
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
      .set("token", token)
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
      .set("token", token)
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
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// add to favorite for authenticated user

describe("add to favorite", function() {
  it("should add to blog to favorite for authenticated users", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/blog/Favorite")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// get all the favorite of authenticated user

describe("get all the favorite blog of authenticated user", function() {
  it("should get all the blog from favorite of the authenticated users", function() {
    chai
      .request("http://localhost:3000")
      .get("/api/blog/get/Favorite")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// Delete the blog from the favorite of authenticated user

describe("Delete the blog from the Favorite for authenticated user", function() {
  it("should Delete the blog from the Favorite for the authenticated users", function() {
    chai
      .request("http://localhost:3000")
      .delete("/api/blog/Delete/Favorite/:id")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// add to read-letter for authenticated user

describe("add to read-letter", function() {
  it("should add to blog to read-letter for authenticated users", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/blog/readLater")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
// get all the favorite of authenticated user

describe("get all the readLater blog of authenticated user", function() {
  it("should get all the blog from readLater of the authenticated users", function() {
    chai
      .request("http://localhost:3000")
      .get("/api/blog/get/readLater")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// Delete the blog from the favorite of authenticated user

describe("Delete the blog from the readLater for authenticated user", function() {
  it("should Delete the blog from the readLater for the authenticated users", function() {
    chai
      .request("http://localhost:3000")
      .delete("/api/blog/Delete/readLater/:id")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

//get the number of followers user have

describe("get the number of followers the user have", function() {
  it("should get the number of followers the user have ", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/User/Followers")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// get all the user the authenticated user follow

describe("get all the user the authenticated user follow", function() {
  it("should get all the user the authenticated user follow", function() {
    chai
      .request("http://localhost:3000")
      .get("/api/Following/User")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// get all the Category the authenticated User follow

describe("get all the Category the authenticated User follow", function() {
  it("should get all the Category the authenticated User follow", function() {
    chai
      .request("http://localhost:3000")
      .get("/api/Following/Category")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// follow a category

describe("follow a category", function() {
  it("should add the category as followed ", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/Follow/Category")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// follow a User

describe("follow a User", function() {
  it("should add the user as followed ", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/Follow/User")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
// Unfollow a Category

describe("Unfollow a Category", function() {
  it("should Unfollow the Category selected  ", function() {
    chai
      .request("http://localhost:3000")
      .delete("/api/Unfollow/Category")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// Unfollow a User

describe("Unfollow a User", function() {
  it("should Unfollow the user selected  ", function() {
    chai
      .request("http://localhost:3000")
      .delete("/api/Unfollow/User")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// check if the Category if followed by the authenticated user

describe("check if the Category if followed by the authenticated user", function() {
  it("should check if the Category if followed by the authenticated user ", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/Check/Category")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// check if the User if followed by the authenticated user

describe("check if the User if followed by the authenticated user", function() {
  it("should check if the User if followed by the authenticated user ", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/Check/User")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// if the user is authenticated can comment on blog

describe("authenticated user can comment on blog", function() {
  it("should be able to comment on the blog if the user is authenticated", function() {
    chai
      .request("http://localhost:3000")
      .post("/api/feedback/New")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// if the user is authenticated can delete comment on blog made by him/her

describe("authenticated user can delete comment on blog made by him/her", function() {
  it("should be able delete comment on blog made by him/her if the user is authenticated", function() {
    chai
      .request("http://localhost:3000")
      .delete("/api/feedback/Delete/:id")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

//like a blog
describe("like a blog", function() {
  it("should return a json with a message attribute ", function() {
    // todo like a blog with a specific id by the authenticated user
    chai
      .request("http://localhost:3000")
      .get("/api/like/:blog_id")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

// unlike a blog
describe("unlike a blog", function() {
  it("should unlike a blog and the count of likes for that blog is reduced by one", function() {
    chai
      .request("http://localhost:3000")
      .get("/api/unlike/:blog_id")
      .set("token", token)
      .end(function(err, res) {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
