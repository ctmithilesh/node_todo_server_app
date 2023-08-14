const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

var corOptions  = {
    origin:true
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




require('./routes/todo.routes')(app);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Todo Demo Server 1.0" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
  