const dbConfig = require('../config/db.config')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url

db.todos = require("./todo.model");
db.user = require("./user.model")
db.role = require("./role.model")

db.expense = require("./expense.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;