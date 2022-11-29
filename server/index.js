const express = require("express");
const app =express();
const mysql =require('mysql');
const cors =require('cors');
const bodyparser =require('body-parser');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { response } = require("express");

app.use(express.json())

// koneksi ke database mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'log-regdb'
});

// Implementasi Cors
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials:true,
    })
);

app.use(bodyparser.urlencoded({ extended: true }));

app.post("/register", (req,res) => {
    const username =req.body.username;
    const password =req.body.password;
    const name =req.body.name;
    console.log(username,password,name);

    bcrypt.hash(password,10,(err,hash)=>{
        console.log(hash);
        if (err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users(username,password,name) VALUES (?,?,?)",
        [username,hash, name],
        (err,result) => {
            console.log(err);
        }
    );
    })
})

app.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
console.log(username, password)
    db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            console.log(result);
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) =>{
                    if (response) {
                        let token = jwt.sign(
                            { userId: result[0].id, username: result[0].username },
                            "secretkeyappearshere",
                            { expiresIn: "1h" }
                        );
                        res.send(token);
                        console.log(token);
                    } else {
                        res.send({ message: "Kombinasi username/password salah" });
                    }
                });
            } else {
                res.send({ message: "User tidak ditemukan!" });
            }
        }
    );
});

app.listen(3001, () => {
    console.log("server running");
});