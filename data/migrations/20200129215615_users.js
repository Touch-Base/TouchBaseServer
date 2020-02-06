exports.up = function(knex) {
    return (knex.schema
        .createTable('users', tbl => {
            tbl.increments('id');
            tbl.string('firstname', 128).notNullable();
            tbl.string('lastname', 128).notNullable();
            tbl.date('creationDate');
            tbl.string('email', 128).notNullable().unique();
            tbl.integer('age');
            tbl.string('location');
            tbl.integer('jobsTotal');
            tbl.integer('connectionsTotal');
            tbl.string('summary');
        })
)};

exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('users')
  };
