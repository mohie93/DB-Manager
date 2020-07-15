// connect without database selected
const knex = require("knex")({
  client: process.env.DB_ENGIN,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DEFAULT_DB, // needed for connection wise
    charset: "utf8",
  },
});

module.exports = knex;
