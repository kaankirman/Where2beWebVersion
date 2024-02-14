const PORT = process.env.PORT ?? 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

//signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        await pool.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2)', [email, hashedPassword]);
        const accessToken = token.sign({ email: email }, "secret", { expiresIn: "1h" });
        res.json({ email: email, accessToken: accessToken });

    } catch (error) {
        console.error(error);

    }

});
//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (users.rows.length === 0) {
            return res.json({ message: "User does not exist" });
        }
        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const accessToken = token.sign({ email: email }, "secret", { expiresIn: "1h" });

        if (success) {
            res.json({ 'email':users.rows[0].email, accessToken: accessToken})
        }else
        {
            res.json({message: "Wrong password"})
        }
        console.log(users.rows[0].hashed_password);
    } catch (error) {
        console.error(error);

    }

});

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
