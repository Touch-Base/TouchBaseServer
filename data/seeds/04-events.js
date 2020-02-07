const { events } = require('../seedData.js')

exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex.from('events').insert(events)
}