const PORT = process.env.PORT ?? 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

//get existing files
app.get('/files/:email', async (req, res) => {
    const { email } = req.params;
    console.log(email);

    try {
        const files = await pool.query('SELECT * FROM files WHERE email = $1', [email]);
        res.json(files.rows);
    } catch (error) {
        console.error(error);

    };
});

//create new file
app.post('/files', async (req, res) => {
    const { email, title, description, lat, lon, date } = req.body;
    const file_id = uuidv4();
    try {
        await pool.query('INSERT INTO files (file_id, email, title, description, lat, lon, date) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [file_id, email, title, description, lat, lon, date]);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
