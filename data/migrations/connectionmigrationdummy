exports.up = function(knex) {
    return (knex.schema 
        .createTable('connections', tbl => {
            tbl.increments('id');
            tbl.string('firstname').notNullable(); // First name of connection
            tbl.string('lastname').notNullable(); // Last name of connection
            tbl.string('title').notNullable(); // Connection's title
            tbl.string('company').notNullable(); // Connection's company
            tbl.string('phone'); // Connection's phone number
            tbl.string('email'); // Connection's email address
            tbl.text('notes'); // Notes about the connection
            tbl
              .integer('userId')
              .unsigned()
              .references('id')
              .inTable('users'); // Matches the connection to the user
        })
)};

exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('connections')
  };
