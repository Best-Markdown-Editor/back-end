const knex = require("knex");

const config = require("../../knexfile");

const db = knex(config[process.env.NODE_ENV || "development"]);

export default db;
