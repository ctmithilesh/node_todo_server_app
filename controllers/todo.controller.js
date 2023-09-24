const db = require("../models");
const Todos = db.todos;

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request

  console.log(req)
  if (!req.body.user_id) {
    res.status(400).send({ message: "User ID is Required!" });
    return;
  }
  if (!req.body.todo_title) {
    res.status(400).send({ message: "Todo title is Required!" });
    return;
  }
  

  // Create a Tutorial
  const todo_data = new Todos({
    todo_title: req.body.todo_title,
    todo_description: req.body.todo_description,
    user_id: req.body.user_id
   
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

exports.findTodoByUser = (req, res)=>{

  Todos.find({user_id: req.body.user_id}).then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.status(500).send({
      message:
        err.message || `Cannot fetch todos with ID ${req.body.user_id}`
    })
  })

}

exports.findOneTodo = (req,res)=>{

  console.log(req.params.id)

  Todos.find({_id: req.params.id}).then(data=>{
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message
    });
  });


}

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

exports.updateTodo = (req, res) => {


    const id = req.params.id 
    console.log(id)
    // const todo_data = {
    //   todo_title: req.body.todo_title,
    //   todo_description: req.body.todo_description
    // }

    Todos.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todos with id=${id}. Maybe Student was not found!`
        });
      } else res.send({ message: "Todo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + err
      });
    });
}

