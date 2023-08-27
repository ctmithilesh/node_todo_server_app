const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
      lowercase: true,
      trim: true
    },
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })

schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model("Users", schema);

module.exports = User;