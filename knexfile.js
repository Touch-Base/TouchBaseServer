require('dotenv').config()

module.exports = {
    development: {
      client: 'pg',
      useNullAsDefault: true, 
      connection: {
        host: process.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.eventNames.DB_NAME || 'touchbase',
      },
      migrations: {
        directory: './data/migrations'
      },
      seeds: {
        directory: './data/seeds'
      },
    },
    production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      migrations: { directory: "./data/migrations" },
      seeds: { directory: "./data/seeds" }
    },
  };