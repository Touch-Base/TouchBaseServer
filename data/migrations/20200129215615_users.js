exports.up = function(knex) {
    return (knex.schema
        .createTable('users', tbl => {
            tbl.increments('id');
            tbl.string('firstname', 128).notNullable(); // User's first name
            tbl.string('lastname', 128).notNullable(); // User's last name
            tbl.date('creationDate'); // Date the account was created
            tbl.string('email', 128).notNullable().unique(); // User's email address
            tbl.integer('age'); // User's age
            tbl.string('location'); // User's location
            tbl.integer('jobsTotal'); // Number of jobs applied so far
            tbl.integer('connectionsTotal'); // Number of connections made so far
            tbl.text('summary'); // Summary of user
        })
)};

exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('users')
  };
