const { ObjectID } = require('bson');
const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();

// middleware to parse json to use it in request body to handle post requests
app.use(express.json());

let db 
connectToDb((err) => {
    if(!err){
        app.listen(3000, () => {
            console.log("listening on port 3000");
        })
        db = getDb();
    }
})


// routes

// home page
app.get('/', (req, res) => {
    res.redirect('/books')
})

// get all the books
app.get('/books', (req, res) => {
    // query parameter(?=) to perform simple pagination
    // console.log(req.query);
    let page = req.query.p || 0;
    let booksPerPage = req.query.l || 3;
    let books = []
    // this returns an iterator/cursor where we can use toArray or forEach method (coding differs than the terminal behaviour)
    db.collection('books').find().sort({rating:-1}).skip(page * booksPerPage).limit(parseInt(booksPerPage))
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

// get a single book
app.get('/books/:id', (req, res) => {
    let id = req.params.id
    if(ObjectID.isValid(id)){
        db.collection('books')
        .findOne({_id: ObjectID(id)})
        .then(book => {
            if(book){
                res.status(200)
                res.json(book)
            } else {
                res.status(404)
                res.json({error: 'book not found'})
            }
        })
        .catch(() => {
            res.status(500)
            res.json({error: 'error fetching book'})
        })
    }
    else {
        res.status(500)
        res.json({error: 'invalid id'})
    }
})

// create a new book
app.post('/books', (req,res) => {
    const book = req.body
    db.collection('books').insertOne(book)
    .then((result) => {
        res.status(201)
        res.json(result)  // the result that we will get back from mongoDB once the book is successfully inserted
    })
    .catch((err) => {
        res.status(500)
        res.json({err: 'error adding book'})
    })
})


// delete a book
app.delete('/books/:id', (req, res) => {
    let id = req.params.id
    if(ObjectID.isValid(id)){
        db.collection('books')
        .deleteOne({_id: ObjectID(id)})
        .then(result => {
            if(result.deletedCount === 1){
                res.status(200)
                res.json(result)
            } else {
                res.status(404)
                res.json({error: 'book not found'})
            }
        })
        .catch(() => {
            res.status(500)
            res.json({error: 'error deleting book'})
        })
    }
    else {
        res.status(500)
        res.json({error: 'invalid book id'})
    }
})

// update a book
app.patch('/books/:id', (req,res) => {
    const updates = req.body
    let id = req.params.id
    if(ObjectID.isValid(id)){
        db.collection('books')
        .updateOne({_id: ObjectID(id)}, {$set: updates})
        .then(result => {
            if(result.modifiedCount === 1){
                res.status(200)
                res.json(result)
            } else {
                res.status(404)
                res.json({error: 'book not found'})
            }
        })
        .catch((err) => {
            res.status(500)
            res.json({error: 'error updating the book'})
        })
    }
    else {
        res.status(500)
        res.json({error: 'invalid book id'})
    }
})