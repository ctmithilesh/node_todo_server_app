module.exports = app => {
    const Expense = require("../controllers/expense.controller");
  
    var router = require("express").Router();
  
    // Create a new Todo
    router.post("/expense/add", Expense.create);

    // Find All Expense
   // router.get("/expense/find/all",Expense.findAll)

    // Get individual Todo 
    router.get("/expense/find/:id", Expense.findOneExpense)

    // Find Expense by user 
    router.post("/expense/find/user", Expense.findExpenseByUser)

    router.post("/expense/delete",Expense.removeExpense)
    router.post("/expense/delete/all",Expense.deleteAll)

    router.put("/expense/update/:id",Expense.updateExpense)
 
 
  
    app.use('/api', router);
  };