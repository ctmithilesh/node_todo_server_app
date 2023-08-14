const db = require("../models");
const Todos = db.todos;

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request

      console.log(req)
  if (!req.body.todo_title && !req.body.todo_description) {
    res.status(400).send({ message: "Course Name is Required!" });
    return;
  }

  // Create a Tutorial
  const todo_data = new Todos({
    todo_title: req.body.todo_title,
    todo_description: req.body.todo_description
   
  })
  console.log(todo_data)

  // Save Todo in the database
  Todos.create(todo_data).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
  
};
exports.findAll = (req, res) => {


Todos.find().then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while creating the Batch."
  });
});

};

exports.deleteAll = (req, res) => {

  Courses.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Courses were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Courses."
    });
  });

};

