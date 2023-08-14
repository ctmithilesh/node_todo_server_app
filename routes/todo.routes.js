module.exports = app => {
    const Todos = require("../controllers/todo.controller");
  
    var router = require("express").Router();
  
    // Create a new Todo
    router.post("/todo/add", Todos.create);

    // Find All Todos
    router.get("/todo/find/all",Todos.findAll)

    // router.delete("/course/delete/all",Courses.deleteAll)
 
 
  
    app.use('/api', router);
  };