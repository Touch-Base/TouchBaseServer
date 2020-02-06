exports.up = function(knex) {
    return (knex.schema 
        .createTable('job', tbl => {
            tbl.increments('id');
            tbl.string('position').notNullable(); // Position Name
            tbl.string('company').notNullable(); // Company Name
            tbl.date('appDate'); // Application Date
            tbl.text('notes'); // Description of the job/interview notes
            tbl.boolean('interview', false); // Checks if if there is an interview offer
            tbl
              .integer('userId')
              .unsigned()
              .references('id')
              .inTable('users'); // Matches the job to the user
        })
)};

exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('job')
  };
      
