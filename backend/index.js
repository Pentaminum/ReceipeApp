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
app.use(express.static(path.join(__dirname, 'build')));

(async () => {
    //function herer
    await pool.query('CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name VARCHAR(100), age INT)');
})();

app.get('/', (req, res) => {   
    res.sendFile(path.join(__dirname, 'build', 'index.html')); 
});

app.post('/recipes', async (req, res) => {
    const { name, age } = req.body;
    const response = await pool.query('INSERT INTO recipes (name, age) VALUES ($1, $2)', [name, age]);
    res.send("success");
});

app.get('/recipes', async (req, res) => {
    const response = await pool.query('SELECT * FROM recipes');
    res.send(response.rows);
});

app.listen(port, '0.0.0.0')
console.log(`Server is running on port ${port}`);
