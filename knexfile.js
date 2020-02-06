module.exports = {
    development: {
      client: 'pg',
      useNullAsDefault: true, 
      connection: {
        host: process.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.eventNames.DB_NAME || 'touchbase',
      },
      migrations: {
        directory: './data/migrations'
      },
      seeds: {
        directory: './data/seeds'
      },
      // needed when using foreign keys
      pool: {
        afterCreate: (conn, done) => {
          // runs after a connection is made to the sqlite engine
          conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
        },
      },
    },
  };