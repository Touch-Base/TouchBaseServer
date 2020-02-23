exports.up = function(knex, Promise) {
    return (knex.schema 
        .createTable('jobs', tbl => {
            tbl.increments('id');
            tbl.string('position').notNullable(); // Position Name
            tbl.string('company').notNullable(); // Company Name
            tbl.string('link'); // Link to job description
            tbl.enum('method', ['LinkedIn', 'Connection', 'Job Website', 'Company Site', 'Other']).notNullable();
            tbl.string('appDate'); // Application Date
            tbl.text('notes'); // Description of the job/interview notes
            tbl.text('color') // Color of the job card background
            tbl.boolean('interview').defaultTo(false); // Checks if if there is an interview offer
            tbl
              .integer('userId')
              .unsigned()
              .references('id')
              .inTable('users'); // Matches the job to the user
        })
)};

exports.down = function(knex, Promise) {
    return knex.schema
      .dropTableIfExists('jobs')
  };
      