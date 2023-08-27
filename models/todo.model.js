const mongoose = require("mongoose");

const schema = mongoose.Schema({
    todo_title:String,
    todo_description:String,
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
    ],

  },{ timestamps: true })

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Todo = mongoose.model("Todos", schema);

module.exports = Todo;