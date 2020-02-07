const { connections } = require('../seedData.js')

exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex.from('connections').insert(connections)
}