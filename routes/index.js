var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

function Books() {
   return knex('books');
}

function Authors() {
   return knex('authors');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'gReads' });
});

module.exports = router;
