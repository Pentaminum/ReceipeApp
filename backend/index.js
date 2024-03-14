const express = require('express');
const app = express();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "db",
    user: "scott0929",
    password: "parkjusung12"
  });

const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Backend server working');
  });

app.post('/recipes', async (req, res) => {
    const { name, lastModified, ingredients, directions } = req.body;
    const response = await con.query(`INSERT INTO users (name, lastModified, ingredients, directions) VALUES ('${name}', '${lastModified}', '${ingredients}', '${directions}')`);
    res.json('success');
});

app.get('/recipes', async (req, res) => {
    const response = await con.query('SELECT * FROM users');
    res.send(response.rows);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });