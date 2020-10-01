// eslint-disable-next-line
const knex = require("knex");

// eslint-disable-next-line
const config = require("../../knexfile");

const db = knex(config[process.env.NODE_ENV || "development"]);

export default db;
