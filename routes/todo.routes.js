module.exports = app => {
    const Todos = require("../controllers/todo.controller");
  
    var router = require("express").Router();
  
    // Create a new Todo
    router.post("/todo/add", Todos.create);

    // Find All Todos
    router.get("/todo/find/all",Todos.findAll)

    // Get individual Todo 
    router.get("/todo/find/:id", Todos.findOneTodo)

    // Find Todos by user 
    router.post("/todo/find/user", Todos.findTodoByUser)

    router.post("/todo/delete",Todos.removeTodo)
    router.post("/todo/delete/all",Todos.deleteAll)

    router.put("/todo/update/:id",Todos.updateTodo)
 
 
  
    app.use('/api', router);
  };