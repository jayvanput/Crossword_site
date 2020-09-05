const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors');
const db = require("./database.js")

// Routes and middleware
app.use(morgan('tiny'));
app.use(cors());
app.use('/', express.static('build'));

app.get('/puzzles/', (req, res, next) => {
  let puzzles = [];
  db.serialize(() => {
    db.each('SELECT * FROM puzzle;', (error, row) => {
      puzzles.push(row)
    }, function () {
      res.json({
        "puzzles": puzzles,
      })
    })
  })
})

app.get('/puzzles/:id/puzzle', (req, res, next) => {
  let puzzle = [];
  db.each(`SELECT * FROM puzzle WHERE ID = ${req.params.id};`, (error, row) => {
    puzzle.push(row);
  }, function () {
    res.json(puzzle)
  })
})

app.get('/puzzles/:id/squares', (req, res, next) => {
  let squares = [];
  db.each(`SELECT * FROM square WHERE puzzleID = ${req.params.id};`, (error, row) => {
    squares.push(row);
  }, function () {
    res.json(squares)
  })
})

app.get('/puzzles/:id/clues', (req, res, next) => {
  let clues = [];
  db.each(`SELECT * FROM clue WHERE puzzleID = ${req.params.id};`, (error, row) => {
    clues.push(row);
  }, function () {
    res.json(clues)
  })
})
app.use('*', express.static('build'));

app.listen(4000, () => {
  console.log('doing the big boy things on port 3000!')
})