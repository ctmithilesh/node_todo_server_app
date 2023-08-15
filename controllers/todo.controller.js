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

exports.removeTodo = (req,res)=>{

  const todo_id = req.body.todo_id 

  Todos.deleteOne({_id: todo_id})
  .then(data=>{
    res.send({
      message:`${data} Deleted`
    })
  })
  .catch(err=>{
    res.status(500).send({
      message:
        err.message || "Something went wrong!"
    })
  })


}

exports.deleteAll = (req, res) => {

  Todos.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Todoes were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Courses."
    });
  });

};

