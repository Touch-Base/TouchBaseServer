const { jobs } = require('../seedData.js')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from('jobs').insert(jobs)
}