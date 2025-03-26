const express = require("express");
var bodyParser = require('body-parser')
const { Client } = require('pg')
const app = express();
const client = new Client({
  connectionString:"postgresql://neondb_owner:npg_jMX1A7KSzrvt@ep-lingering-butterfly-a586gfv0-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
})
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = process.env.PORT || 8080;
/*
let light_status = [
  {
    id:1,
    name:'kospi',
    power:'off'
  }
]
*/
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

//createUsersTable();

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

//insertData("bedroom", "off");
/*
async function getData(id) {
  await client.connect();
  const res = await client.query(`SELECT * FROM users`);
  const found=res.rows.find((user)=>user.id==id);
  console.log(found);
  return found;
}
*/
//getData(1)
async function getData(light_name) {
  try{
    await client.connect();
  }catch(err){
   //pass
   console.log("client.connect failed")
  }
  const res = await client.query(`SELECT * FROM users`);
  const found=res.rows.find((user)=>user.light_name==light_name);
  console.log(found);
  return found;
}
/*
async function updatePower(light_name, power) {
  await client.connect();
  const updateQuery = `UPDATE users SET power = $2 WHERE light_name = $1`;
  const values = [light_name, power];
  const res = await client.query(updateQuery, values);
  console.log(res);
  return res;
}

//updatePower("bedroom", "on");
*/
async function updatePower(id, power) {
  try{
    await client.connect();
  }
  catch(err){
    console.log("client.connect failed")
  }
  const updateQuery = `UPDATE users SET power = $2 WHERE id = $1`;
  const values = [id, power];
  const res = await client.query(updateQuery, values);
  console.log("---------------")
  console.log(res);
  return res;
}

//updatePower("bedroom", "on");

async function deleteUser(light_name) {
  //await client.connect();
  try{
    await client.connect()
  }
  catch(err){
    console.log("client.connection failed")
  }
  const deleteQuery = `DELETE FROM users WHERE light_name = $1`;
  const res = await client.query(deleteQuery, [light_name]);
  console.log(res);
  return res;
}

//deleteUser("bedroom");

async function userExists(light_name){
  //await client.connect()
  try{
    await client.connect()
  }
  catch(err){
    console.log("client.connection failed")
  }
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
//userExists("bedroom")

async function idExists(id){
  try{
    await client.connect()
  }
  catch(err){
    console.log("client.connection failed")
  }
  
  const SQL = 'SELECT * FROM users WHERE id=$1;';
  console.log('this is the id from idExists', id);
  const values = [id];
  const res = await client.query(SQL,values);
  const found=res.rows[0]
  if (found==undefined){
    console.log(String(id) + " not found")
    return -1
  }
  else{
    console.log(String(id) + " found")
    console.log(found)
    return id
  }
}
//idExists("1")

app.get("/", (req, res) => {
  res.send("channel");
});
app.get("/light", (req, res) => {
  //res.send("you have entered the light page");
  //res.json(light_status)
  //res.json(getData("bedroom"))
  
  getData("bedroom").then(data=>{
    res.json(data)
    console.log(data);
  }).catch(err=>{
    return res.status(404).json({ message: err });
    console.log(err); 
  });
  
 /*
  try{
    const data= await getData('bedroom');
    res.json(data)
  } catch(err){
    return res.status(404).json({ message: err });
  }
  */
});
/*
app.patch('/update_light/:id',jsonParser,(req,res)=>{
 
  const {id}=req.params;
  //console.log(req.params)
  const body=req.body;
  //console.log(body)
  const index = light_status.findIndex(light_status=>light_status.id ===parseInt(id));
  if (index === -1){
    return res.status(404).json({ message: 'User not found' });
  }
  light_status[index]={...light_status[index],...body};
  console.log(light_status[index])
  res.status(200).json(light_status[index])
})
*/
app.patch('/update_light/:id',jsonParser,(req,res)=>{
 
  const {id}=req.params;
  const body=req.body;
  //const index = light_status.findIndex(light_status=>light_status.id ===parseInt(id));
  idExists(id).then(index=>{
    if (index === -1){
      return res.status(404).json({ message: 'User not found' });
    }
    //light_status[index]={...light_status[index],...body};
    //console.log(light_status[index])
    updatePower(id,body.power).then(result=>{
      res.status(200).json(result)  
      //console.log(res)
      
    })
    
  })
  
})
app.listen(port, () => {
  `Server started on port ${port}`;
});
