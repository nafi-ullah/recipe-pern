const express = require("express");
const app = express();
const cors = require("cors");
PORT = 5000;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Routes//

// create a recipe

app.post('/recipes', async (req, res) => {
    try {
      const { recipe_name, rating, description } = req.body;
  
      const query = 'INSERT INTO recipe (recipe_name, rating, description) VALUES ($1, $2, $3) RETURNING *';
      const values = [recipe_name, rating, description];
  
      const result = await pool.query(query, values);
  
      res.status(201).json({
        status: 'success',
        data: {
          recipe: result.rows[0],
        },
      });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  });
  
  //get all todos
  
  app.get("/recipe", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get a todo
  
  app.get("/recipe/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a todo
  
  app.put("/recipe/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/recipe/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})