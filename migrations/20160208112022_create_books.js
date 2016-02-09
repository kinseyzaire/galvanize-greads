exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.string('title');
    table.string('genre');
    table.text('description');
    table.string('cover_url');
    table.integer('author_id_1');
    table.integer('author_id_2');
    table.integer('author_id_3');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
