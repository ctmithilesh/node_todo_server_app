const mongoose = require("mongoose");

const schema = mongoose.Schema({

    filename: {
        required: true,
        type: String,
    },
    originalname: {
        required: true,
        type: String,
    },
    filepath: {
        required: true,
        type: String,
    },
    category: {
        required: false,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
    user_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

})

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const Image = mongoose.model("Image", schema);
module.exports = Image
