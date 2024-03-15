const path = require('path');
const express = require('express');
const { Pool } = require('pg');
const app = express();

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'root',
});

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    await pool.query('CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ingredients TEXT NOT NULL, directions TEXT NOT NULL)');
})();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {   
    res.sendFile(path.join(__dirname, 'build', 'index.html')); 
});

// getting all recipes (for Saved Recipes list)
app.get('/recipes', async (req, res) => {
    const response = await pool.query('SELECT * FROM recipes');
    res.send(response.rows);
});

app.post('/recipes', async (req, res) => {
    const { name, lastModified, ingredients, directions } = req.body;
    
    if (!name || !lastModified || !ingredients || !directions) {
        return res.status(400).send("Please fill out all the fields");
    }

    try {
        const response = await pool.query('INSERT INTO recipes (name, lastModified, ingredients, directions) VALUES ($1, $2, $3, $4)', [name, lastModified, ingredients, directions]);
        res.send("New Recipe added!");
    } catch (error) {
        console.error("Error occured while adding a recipe:", error);
        res.status(500).send("Server Error. Please try again.");
    }
});

app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, directions } = req.body;

    // 유효성 검사
    if (!name || !ingredients || !directions) {
        return res.status(400).send("Please provide name, ingredients, and directions");
    }

    try {
        // recipe update
        const response = await pool.query(
            'UPDATE recipes SET name = $1, ingredients = $2, directions = $3, lastModified = CURRENT_TIMESTAMP WHERE id = $4',
            [name, ingredients, directions, id]
        );
        res.send("Recipe updated!");
    } catch (error) {
        console.error("Error occurred while updating the recipe:", error);
        res.status(500).send("Server Error. Please try again.");
    }
});


// deleting a recipe
app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // recipe deletion
        const response = await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
        
        // 404 error if no recipe was deleted
        if (response.rowCount === 0) {
            return res.status(404).send("Recipe not found");
        }

        res.send("Recipe deleted!");
    } catch (error) {
        console.error("Error occurred while deleting the recipe:", error);
        res.status(500).send("Server Error. Please try again.");
    }
});

app.listen(port, '0.0.0.0')
console.log(`Server is running on port ${port}`);
