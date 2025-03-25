const express = require("express");
var bodyParser = require('body-parser')
const app = express();

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = process.env.PORT || 8080;
let light_status = [
  {
    id:1,
    name:'kospi',
    power:'off'
  }
]
app.get("/", (req, res) => {
  res.send("channel");
});
app.get("/light", (req, res) => {
  //res.send("you have entered the light page");
  res.json(light_status)
});
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
}
)
app.listen(port, () => {
  `Server started on port ${port}`;
});
