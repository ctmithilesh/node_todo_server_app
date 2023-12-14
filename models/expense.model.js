const mongoose = require("mongoose");

const schema = mongoose.Schema({
    expense_amount:Number,
    expense_category:String,
    expense_date: Date,
    user_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref:'User'
        }
      ],
})

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Expense = mongoose.model("Expenses", schema);

module.exports = Expense;