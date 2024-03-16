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
//       VALUES clause contains the actual data we want to insert. The $1, $2, and $3 are placeholders for the actual values. These placeholders correspond to the order of the columns specified earlier.
// $1 represents the value for the recipe_name column.
// $2 represents the value for the rating column.

// *RETURNING ***: This optional clause returns information about the inserted row. The asterisk (*) indicates 
// that we want to retrieve all columns of the newly inserted row.
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
  
  //get all recipe
  
  app.get('/recipes', async (req, res) => {
    try {
      const query = 'SELECT * FROM recipe';
      const result = await pool.query(query);
  
      res.status(200).json({
        status: 'success',
        data: {
          recipes: result.rows,
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
  

  
   //update a todo
  
   app.put('/recipes/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
      const { recipe_name, rating, description } = req.body;
  
      const query = 'UPDATE recipe SET recipe_name = $1, rating = $2, description = $3 WHERE recipe_id = $4 RETURNING *';
      const values = [recipe_name, rating, description, recipeId];
  
      const result = await pool.query(query, values);
  
      if (result.rowCount === 0) {
        res.status(404).json({
          status: 'error',
          message: 'Recipe not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          data: {
            recipe: result.rows[0],
          },
        });
      }
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  });
  
  // //delete a todo
  
  // app.delete("/recipe/:id", async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
  //       id
  //     ]);
  //     res.json("Todo was deleted!");
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // });


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})