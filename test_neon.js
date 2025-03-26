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
            light_name VARCHAR(50) UNIQUE NOT NULL,
            power VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}

createUsersTable();
*/
/*
async function insertData(light_name, power) {
  try {
    await client.connect();
    // Use parameterized query to prevent SQL injection
    const insertQuery =
      "INSERT INTO users (light_name, power) VALUES ($1, $2)";
    const values = [light_name, power];
    const res = await client.query(insertQuery, values);
    console.log("Insertion success:", res); // Output insertion result
  } catch (err) {
    console.error("Error during the insertion:", err);
  }
}

insertData("bedroom", "off");
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
async function updatePower(light_name, power) {
  await client.connect();
  const updateQuery = `UPDATE users SET power = $2 WHERE light_name = $1`;
  const values = [light_name, power];
  const res = await client.query(updateQuery, values);
  console.log(res);
  return res;
}

updatePower("user2", "off");
*/
/*
async function deleteUser(light_name) {
  await client.connect();
  const deleteQuery = `DELETE FROM users WHERE light_name = $1`;
  const res = await client.query(deleteQuery, [light_name]);
  console.log(res);
  return res;
}

deleteUser("user2");
*/
/*
async function userExists(light_name){
  await client.connect()
  const SQL = 'SELECT * FROM users WHERE light_name=$1;';
  console.log('this is the light_name from userExists', light_name);
  const values = [light_name];
  const res = await client.query(SQL,values);
  const found=res.rows[0]
  if (found==undefined){
    console.log(String(light_name) + " not found")
  }
  else{
    console.log(String(light_name) + " found")
    console.log(found)
  }
}
userExists("bedroom")
*/
