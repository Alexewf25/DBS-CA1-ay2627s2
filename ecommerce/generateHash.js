// generateHash.js
const bcrypt = require("bcrypt");

async function generateHash() {
  const password = "Password1!";
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash for Password1! :");
  console.log(hash);
}

generateHash();
