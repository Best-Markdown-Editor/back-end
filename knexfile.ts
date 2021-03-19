// eslint-disable-next-line
const parse = require("pg-connection-string").parse;
const pgconfig = parse(`${process.env.DATABASE_URL}?ssl=true`);
pgconfig.ssl = { rejectUnauthorized: false };

// eslint-disable-next-line
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.MY_DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/data/migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    // debug: true,
    useNullAsDefault: true,
  },

  testing: {
    client: "pg",
    connection: process.env.HEROKU_POSTGRESQL_BROWN_URL,
    migrations: {
      tablename: "knex_migrations",
      directory: "./src/data/migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: pgconfig,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    useNullAsDefault: true,
  },
};
