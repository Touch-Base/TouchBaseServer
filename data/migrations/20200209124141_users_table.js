var myDate = new Date(Date.now() * 1000);

exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl.string("firstname", 128).notNullable(); // User's first name
    tbl.string("lastname", 128).notNullable(); // User's last name
    tbl.string("password", 128);
    tbl.date("creationDate").defaultTo(myDate.toLocaleString()); // Date the account was created
    tbl
      .string("email", 128)
      .notNullable()
      .unique(); // User's email address
    tbl.integer("age"); // User's age
    tbl.string("phone"); // User's phone number
    tbl.string("location"); // User's location
    tbl.string("position"); // User's position
    tbl.string("profilepic"); // User's profile picture URL
    tbl.integer("jobsTotal"); // Number of jobs applied so far
    tbl.integer("connectionsTotal"); // Number of connections made so far
    tbl.text("summary"); // Summary of user
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
