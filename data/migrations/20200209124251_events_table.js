exports.up = function (knex) {
  return knex.schema.createTable("events", (tbl) => {
    tbl.increments("id");
    tbl.string("name").notNullable(); // Name of the event
    tbl.string("location").notNullable(); // Event's location
    tbl.timestamp("date").notNullable(); // Event's date
    tbl.string("time").notNullable(); // Event's time
    tbl.text("description"); // Event description
    tbl.boolean("attended").defaultTo(false); // Did you attend the event?
    tbl.integer("userId").unsigned().references("id").inTable("users"); // Matches the event to the user
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("events");
};
