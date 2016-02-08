var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

function Books() {
   return knex('books');
}

function Authors() {
   return knex('authors');
}

// AUTHORS index
router.get('/authors', function(req, res, next) {
  Authors().select().then(function(results){
    res.render('authors/index', {authors: results});
  });
});

// new AUTHOR

router.get('/authors/new', function(req, res, next) {
  res.render('authors/new');
});

// add new AUTHOR to db

router.post('/authors', function(req, res, next) {
  Authors().insert(req.body).then(function(result){
    res.redirect('/authors');
  });
});

// show AUTHOR

router.get('/authors/:id', function (req, res, next) {
  Authors().where('id', req.params.id).first().then(function(result){
    res.render('authors/show', { author: result });
  });
});

// edit AUTHOR form

router.get('/authors/:id/edit', function (req, res) {
  Authors().where('id', req.params.id).first().then(function(result){
    res.render('authors/edit', { author: result });
  });
});

// update AUTHOR in db

router.post('/authors/:id', function (req, res) {
  Authors().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/authors');
  });
});

// delete a AUTHOR

router.get('/authors/:id/delete', function (req, res) {
  Authors().where('id', req.params.id).del().then(function (result) {
    res.redirect('/authors');
  });
});


module.exports = router;
