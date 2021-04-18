const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todo");

router.get("/", todoController.allTodos);

router.post("/add-todo", todoController.addTodo);

router.post("/delete-todo", todoController.deleteTodo);

router.post("/change-status", todoController.changeStatus);

module.exports = router;
