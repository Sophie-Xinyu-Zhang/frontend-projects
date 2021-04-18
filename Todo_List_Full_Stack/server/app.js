const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todos");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(todoRoutes);

const port = process.env.PORT || 3000;
const DBURL =
  "mongodb+srv://sophie:abc123456@cluster0.uz41y.mongodb.net/todolist?retryWrites=true&w=majority";
mongoose
  .connect(DBURL, { useNewUrlParser: true })
  .then((result) => {
    app.listen(port, () => console.log("Server up"));
  })
  .catch((err) => console.log(err));

// mongodb+srv://sophie:abc123456@cluster0.uz41y.mongodb.net/todolist?retryWrites=true&w=majority
