const db = require("../models");
const Expense = db.expense;

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  
  console.log(req)
  if (!req.body.user_id) {
    res.status(400).send({ message: "User ID is Required!" });
    return;
  }
  if (!req.body.expense_amount) {
    res.status(400).send({ message: "Expense Amount is Required!" });
    return;
  }
  if (!req.body.expense_date) {
    res.status(400).send({ message: "Expense Date is Required!" });
    return;
  }
  

  // Create a Tutorial
  const expense_data = new Expense({
    expense_amount: req.body.expense_amount,
    expense_category: req.body.expense_category,
    expense_date: req.body.expense_date,
    user_id: req.body.user_id
   
  })
  console.log(expense_data)

  // Save Todo in the database
  Expense.create(expense_data).then(data => {
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


Expense.find().then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while creating the Batch."
  });
});

};

exports.findExpenseByUser = (req, res)=>{

  Expense.find({user_id: req.body.user_id}).then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.status(500).send({
      message:
        err.message || `Cannot fetch Expense with ID ${req.body.user_id}`
    })
  })

}

exports.findOneExpense = (req,res)=>{

  console.log(req.params.id)

  Expense.find({_id: req.params.id}).then(data=>{
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message
    });
  });


}

exports.removeExpense = (req,res)=>{

  const todo_id = req.body.todo_id 

  Expense.deleteOne({_id: todo_id})
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

  Expense.deleteMany({})
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

exports.updateExpense = (req, res) => {


    const id = req.params.id 
    console.log(id)
    // const todo_data = {
    //   todo_title: req.body.todo_title,
    //   todo_description: req.body.todo_description
    // }

    Expense.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Expense with id=${id}. Maybe Student was not found!`
        });
      } else res.send({ message: "Todo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + err
      });
    });
}

