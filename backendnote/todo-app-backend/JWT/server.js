// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/todoApp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Schema
// const TodoSchema = new mongoose.Schema({
//   email: String,
//   text: String,
// });

// const Todo = mongoose.model("Todo", TodoSchema);
// const todoRoutes = require("./routes/todoRoutes");
// app.use("/todos", todoRoutes);
// // ✅ GET todos by email
// app.get("/todos/:email", async (req, res) => {
//   try {
//     const todos = await Todo.find({ email: req.params.email });
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ POST todo by email
// app.post("/todos/:email", async (req, res) => {
//   try {
//     const { text } = req.body;
//     const todo = new Todo({ email: req.params.email, text });
//     await todo.save();
//     res.json(todo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5000, () => console.log("✅ Server running on port 5000"));
