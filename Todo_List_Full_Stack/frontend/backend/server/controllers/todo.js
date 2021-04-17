const Todo = require("../model/one-todo");

exports.addTodo = (req, res, next) => {
  console.log("This is the controller to add todos");
  const content = req.body.content;
  const newTodo = new Todo({
    content: content,
    completed: false,
  });
  newTodo
    .save()
    .then((result) => {
      console.log("Todo created in database");
      console.log(result);
      res.status(201).json({
        "received data": newTodo,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Oops, something went wrong with the server" });
    });
};

exports.allTodos = (req, res, next) => {
  console.log("This is the controller to render all todos");
  Todo.find()
    .then((todos) => {
      if (req.params.listName === "all") {
        res.status(200).json({
          todo: todos,
        });
      } else if (req.params.listName === "completed") {
        const completedList = todos.filter((todo) => todo.completed);
        res.status(200).json({
          todo: completedList,
        });
      } else {
        const activeList = todos.filter((todo) => !todo.completed);
        res.status(200).json({
          todo: activeList,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.body._id;
  Todo.findByIdAndRemove(todoId)
    .then(() => {
      console.log("Successfully deleted");
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "There's something wrong on the server side" });
    });
  console.log("This is the controller to delete a todo");
  res.status(201).json({
    "deleting todo": "todo supposed to be deleted",
  });
};

exports.changeStatus = (req, res, next) => {
  const todoId = req.body._id;
  Todo.findById(todoId)
    .then((todo) => {
      console.log("Found the todo in the database");
      todo.completed = !todo.completed;
      todo.save().then((result) => {
        res.status(201).json({
          "current modified todo": todo,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Something was wrong on the server side" });
    });
};
