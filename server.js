const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

var corOptions = {
  origin: [
    'https://todolist-rust-psi.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:4200',
    'https://todo-sooty-nu.vercel.app',
    'https://vue-randomize-app.vercel.app',
    'https://react-todo-basic-app.vercel.app'
  ]
}

app.use(cors(corOptions))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const db = require('./models')
mongoose.set("strictQuery", false);
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!")
}).catch(err => {
  console.log("Cannot connect to the database!", err)
  process.exit()
});
// const Role = db.role
// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });

// }
// initial()





require('./routes/todo.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/expense.routes')(app);
require('./routes/upload.routes')(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo Demo Server 1.0" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
