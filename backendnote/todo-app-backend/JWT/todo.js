// const express = require("express");
// const router = express.Router();
// const Todo = require("../models/Todo");

// // Get todos by email
// router.get("/:email", async (req, res) => {
//   try {
//     const todos = await Todo.find({ email: req.params.email });
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Add todo for user
// router.post("/:email", async (req, res) => {
//   try {
//     const { text } = req.body;
//     const todo = new Todo({
//       email: req.params.email,
//       text,
//     });
//     await todo.save();
//     res.status(201).json(todo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
