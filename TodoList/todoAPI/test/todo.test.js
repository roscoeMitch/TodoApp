const Todo = require("../models/Todo");
const chai = require("chai");
const expect = chai.expect;
var should = require("chai").should();
const chaiHttp = require("chai-http");
const server = require("../server");
const assert = require("assert");

chai.use(chaiHttp);

after((done) => {
  Todo.clearAll();
  done();
});

describe("/Testing Todo API", () => {
  // Testing GET all Todos
  it("test todo API", (done) => {
    chai
      .request(server)
      .get("/todo")
      .end((err, res) => {
        res.should.have.status(200);

        done();
      });
  });

  // Testing POST a Todo
  it("should POST a valid todo", (done) => {
    let todo = {
      task: "go swimming",
      isCompleted: false,
      priority: 1,
      status: "incomplete",
    };

    chai
      .request(server)
      .post("/todo")
      .send(todo)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  /* it("POST should return invalid due to missing data field", (done) => {
    let todo = {
      task: "wash car",
      isCompleted: false,
      priority: 1,
    };

    chai
      .request(server)
      .post("/todo")
      .send(todo)
      .end((err, res) => {
        res.shoud.have.status(400);
        //const message = res.body.message;
        //expect(message).to.be.equal("Missing data fields");
        done();
      });
  }); */
});

it("should verify that there are no duplicate tasks", (done) => {
  let todo1 = {
    task: "go swimming",
    isCompleted: false,
    priority: 1,
    status: "incomplete",
  };
  /* let todo2 = {
    task: "wash car",
    isCompleted: false,
    priority: 1,
    status: "incomplete",
  }; */
  chai
    .request(server)
    .post("/todo")
    .send(todo1)
    //.send(todo2)
    .end((err, res) => {
      res.should.have.status(409);
      const message = res.body.message;
      expect(message).to.be.equal("This task already exists");
      done();
    });
});

// Testing DELETE a todo
describe("Adding a todo", function () {
  let todo;
  beforeEach(function () {
    // todo is an instance of Todo Model
    todo = new Todo({ task: "eat breakfast" });
    todo.save();
  });

  it("Removes a todo", (done) => {
    Todo.findOneAndRemove({ task: "eat breakfast" })
      .then(() => Todo.findOne({ task: "eat breakfast" }))
      .then((todo) => {
        assert(todo === null);
        done();
      });
  });

  it("Removes a todo using its id", (done) => {
    Todo.findByIdAndRemove(todo._id)
      .then(() => Todo.findOne({ task: "eat breakfast" }))
      .then((todo) => {
        assert(todo === null);
        done();
      });
  });
});

// Testing PATCH an existing todo
describe("adding a todo", () => {
  let todo;
  beforeEach((done) => {
    todo = new Todo({ task: "wash car" });
    todo.save().then(() => done());
  });

  // Handling Redundant Code
  function helperFunc(assertion, done) {
    assertion
      .then(() => Todo.find({}))
      .then((todos) => {
        assert(todos.length === 1);
        assert(todos[0].task === "Updated Joe");
        done();
      });
  }

  it("Sets and saves a todo using an instance", (done) => {
    // Not yet updated in MongoDb
    todo.set("task", "Updated wash car");
    helperFunc(todo.save(), done);
  });

  it("Update a user using instance", (done) => {
    helperFunc(user.update({ name: "Updated Joe" }), done);
  });
});
