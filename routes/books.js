var express = require('express');
var knex = require('../db/knex.js');
var validate = require('../lib/validations');

var router = express.Router();

function Books() {
   return knex('books');
}

function Authors() {
   return knex('authors');
}

// BOOKS index
router.get('/books', function(req, res, next) {
  Books().select().then(function(bresults){
    Authors().select().then(function(aresults){
      res.render('books/index', {books: bresults , authors: aresults});
    });
  });
});

// new BOOK

router.get('/books/new', function(req, res, next) {
  Authors().select().then(function(results){
    res.render('books/new', {authors: results});
  });
});

// add new BOOK to db

router.post('/books', function(req, res, next) {
  var error = validate.areUblank(req.body.title);
  if(!validate.areUblank(req.body.title)) {
      Books().insert(req.body).then(function(){
        res.redirect('/books');
      });
    } else {
      Authors().select().then(function(results){
        res.render('books/new', {authors: results, error: error})
      });
    }
});

// show BOOK

router.get('/books/:id', function (req, res, next) {
  Books().where('id', req.params.id).first().then(function(result){
    Authors().where('id', result.author_id_1).orWhere('id', result.author_id_2).orWhere('id', result.author_id_3).then(function(results){
      res.render('books/show', {book: result, authors: results});
    });
  });
});

// edit BOOK form

router.get('/books/:id/edit', function (req, res) {
  Books().where('id', req.params.id).first().then(function(result){
    Authors().select().then(function(results){
      res.render('books/edit', { book: result, authors: results });
    });
  });
});

// update BOOK in db

router.post('/books/:id', function (req, res) {
  var error = validate.areUblank(req.body.title);
  if(!validate.areUblank(req.body.title)) {
    Books().where('id', req.params.id).update(req.body).then(function(){
      res.redirect('/books');
    });
  } else {
    Books().where('id', req.params.id).first().then(function(result){
      Authors().select().then(function(results){
        res.render('books/edit', { book: result, authors: results, error: error });
      });
    });
  }
});

// delete a BOOK

router.get('/books/:id/delete', function (req, res) {
  Books().where('id', req.params.id).del().then(function (result) {
    res.redirect('/books');
  });
});


module.exports = router;
