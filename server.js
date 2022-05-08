const express = require('express');
const fs = require('fs');
const path = require('path');
const dbFile = require('./db/db.json')

const app = express();

const PORT = 3001;

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('/api/notes', (req, res) => {
    res.json(dbFile)
})

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    dbFile.push(req.body)
    fs.writeFile("./db/db.json", JSON.stringify(dbFile), () => {
        res.send("hello")
    })
    
})

app.listen(PORT, () => {
    console.log("server is running")
})