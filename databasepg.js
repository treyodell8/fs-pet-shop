const { Pool } = require('pg');
const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 5555
app.use(express.json());

const pool = new Pool({
    user: 'wayneodell',
    host: 'localHost',
    database: 'petshopdb',
    password: 'secretpassword',
    port: 5432,
  });

app.post('/pets/', async (req, res) => {
    try {
        const data = await pool.query("INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3);", [req.body.age, req.body.kind, req.body.name]);
        res.send(req.body);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/pets/', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM pets;");
        res.send(data.rows)
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/pets/:id', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM pets WHERE id = $1;", [req.params.id]) //array of values);
        res.send(data.rows)
    } catch (err) {
        console.error(err.message);
    }
})

app.patch('/pets/:id', async (req, res) => {
    try {
        const data = await pool.query("UPDATE pets SET name = $1 WHERE id = $2;", [req.body.name, req.params.id])
        res.send(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})


app.delete('/pets/:id', async (req, res) => {
    try {
        const date = await pool.query("DELETE FROM pets WHERE id = $1;", [req.params.id])
        res.send(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})

