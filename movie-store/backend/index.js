import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hello!",
    database: "movies"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello! This is the backend :)");
})

app.get("/movies", (req, res) => {
    const q = "SELECT * from movies"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
});

app.post("/movies", (req, res) => {
    const q = "INSERT INTO movies (`title`, `desc`,`price`, `cover`) VALUES (?)"
    const values = [req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("movie has been created successfully.")
    });
});

app.delete("/movies/:id", (req, res) => {
    const movieId = req.params.id;
    const q = "DELETE FROM movies WHERE id = ?"

    db.query(q, [movieId], (err, data) => {
        if (err) return res.json(err);
        return res.json("movie has been deleted successfully.")
    });
});

app.put("/movies/:id", (req, res) => {
    const movieId = req.params.id;
    const q = "UPDATE movies SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover]

    db.query(q, [...values, movieId], (err, data) => {
        if (err) return res.json(err);
        return res.json("movie has been updated successfully.")
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!")
});