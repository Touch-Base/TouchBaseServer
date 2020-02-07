const { users } = require('../seedData');

exports.seed = function(knex) {
  // console.log(users)
  return knex.from('users').insert(users)
}