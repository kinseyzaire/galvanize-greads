exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments();
    table.string('firstname');
    table.string('lastname');
    table.text('bio');
    table.string('portrait_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
