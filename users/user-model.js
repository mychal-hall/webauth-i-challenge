const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  login,
  get
};

function get() {
  return db("users").select("id", "username", "password");
}

async function insert(user) {
  const [id] = await db("users").insert(user);
}
