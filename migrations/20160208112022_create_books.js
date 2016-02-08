exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.string('title');
    table.string('genre');
    table.string('description');
    table.string('cover_url');
    table.string('author_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
