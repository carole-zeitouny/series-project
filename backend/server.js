const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Series'
});

app.get('/', (req, res) => {
    return res.json("from db");
});

app.get("/shows", (req, res) => {
    const q = "SELECT * FROM shows";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.post('/watched', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const q = "INSERT INTO watched (Title) VALUES (?)";
    const userId = 1;

    db.query(q, [title], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(201).json({ message: 'Marked as watched successfully' });
    });
});

app.get('/watched', (req, res) => {
    const q = "SELECT * FROM watched";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.get('/shows/genre/:genre', (req, res) => {
    const { genre } = req.params;
    const q = "SELECT * FROM shows WHERE Genre = ?";
    db.query(q, [genre], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/show/:title', (req, res) => {
    const { title } = req.params;
    const q = "SELECT * FROM shows WHERE Title = ?";
    db.query(q, [title], (err, data) => {
        if (err) return res.json(err);

        if (data.length === 0) {
            return res.status(404).json({ message: 'TV show not found' });
        }

        return res.json(data[0]);
    });
});


app.delete('/watched/:watchedId', (req, res) => {
    const { watchedId } = req.params;

    if (!watchedId) {
        return res.status(400).json({ message: 'WatchedId is required' });
    }

    const q = "DELETE FROM watched WHERE WatchedId = ?";

    db.query(q, [watchedId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ message: 'Removed from watched successfully' });
    });
});


app.get('/watchlist', (req, res) => {
    const q = "SELECT * FROM watchlist";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.post('/watchlist', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const userId = 1;

    const q = "INSERT INTO watchlist (UserId, ShowId, AddedOn, Title) VALUES (?, ?, NOW(), ?)";
    const findShowIdQuery = "SELECT ShowId FROM shows WHERE Title = ?";

    db.query(findShowIdQuery, [title], (findErr, findData) => {
        if (findErr) return res.status(500).json(findErr);

        const showId = findData.length > 0 ? findData[0].ShowId : null;

        if (!showId) {
            return res.status(404).json({ message: 'TV show not found' });
        }

        db.query(q, [userId, showId, title], (insertErr, insertData) => {
            if (insertErr) return res.status(500).json(insertErr);

            return res.status(201).json({ message: 'Added to watchlist successfully' });
        });
    });
});

app.delete('/watchlist/:showId', (req, res) => {
    const { showId } = req.params;

    if (!showId) {
        return res.status(400).json({ message: 'ShowId is required' });
    }

    const q = "DELETE FROM watchlist WHERE ShowId = ?";

    db.query(q, [showId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json({ message: 'Removed from watchlist successfully' });
    });
});



app.get('/users', (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.get('/signup', (req, res) => {
    const q = "SELECT * FROM signup";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.get('/login', (req, res) => {
    const q = "SELECT * FROM login";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});


app.post('/signup', (req, res) => {
    console.log('Received data:', req.body);

    const sql = 'INSERT INTO login (name, email, password) VALUES (?)';

    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            return res.json({ Error: 'Inserting data error' });
        }
        return res.json({ Status: 'Success' });
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email =?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: 'Login error in server' });
        if (data.length > 0) {
            if (req.body.password === data[0].password) {
                return res.json({ Status: 'Success' });
            } else {
                return res.json({ Error: 'Password not matched' });
            }
        } else {
            return res.json({ Error: 'No email existed' });
        }
    });
});


app.listen(8800, () => {
    console.log("Server is running on port 8800");
});
