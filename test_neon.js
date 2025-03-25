const { Client } = require('pg')
 
const client = new Client({
  connectionString:"postgresql://neondb_owner:npg_jMX1A7KSzrvt@ep-lingering-butterfly-a586gfv0-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
})

// Function to create a users table in database.
/*
async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            lightname VARCHAR(50) UNIQUE NOT NULL,
            power VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}

createUsersTable();
*/
/*
async function insertData(lightname, power) {
  try {
    await client.connect();
    // Use parameterized query to prevent SQL injection
    const insertQuery =
      "INSERT INTO users (lightname, power) VALUES ($1, $2)";
    const values = [lightname, power];
    const res = await client.query(insertQuery, values);
    console.log("Insertion success:", res); // Output insertion result
  } catch (err) {
    console.error("Error during the insertion:", err);
  }
}

insertData("user2", "on");
*/
/*
async function getData(id) {
  await client.connect();
  const res = await client.query(`SELECT * FROM users`);
  const found=res.rows.find((user)=>user.id==id);
  console.log(found);
  return res;
}
getData(1)
*/
/*
async function updatePower(lightname, power) {
  await client.connect();
  const updateQuery = `UPDATE users SET power = $2 WHERE lightname = $1`;
  const values = [lightname, power];
  const res = await client.query(updateQuery, values);
  console.log(res);
  return res;
}

updatePower("user2", "off");
*/
/*
async function deleteUser(lightname) {
  await client.connect();
  const deleteQuery = `DELETE FROM users WHERE lightname = $1`;
  const res = await client.query(deleteQuery, [lightname]);
  console.log(res);
  return res;
}

deleteUser("user2");
*/