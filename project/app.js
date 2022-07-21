const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();

let db 
connectToDb((err) => {
    if(!err){
        app.listen(3000, () => {
            console.log("listening on port 3000");
        })
        db = getDb();
    }
})

app.get('/', (req, res) => {
    res.redirect('/books')
})

app.get('/books', (req, res) => {
    let books = []
    // this returns an iterator/cursor where we can use toArray or forEach method (coding differs than the terminal behaviour)
    db.collection('books').find().sort({rating:-1})
    .forEach((book) => books.push(book))
    .then(() => {
        res.status(200)
        res.json(books)
    })
    .catch(() => {
        res.status(500)
        res.json({error: 'error fetching books'})
    })
})

