const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
let light_status = [
  {
    id:1,
    name:'kospi',
    power:"off"
  }
]
app.get("/", (req, res) => {
  res.send("Subscribe to Arpan Neupane's channel");
});
app.post("/light", (req, res) => {
  //res.send("you have entered the light page");
  res.json(light_status)
});
app.patch('/light/:id',(req,res)=>{
  const {id}=req.params;
  const {name, power}=req.body;
  const index = light_status.findIndex(light_status=>light_status.id ===parseInt(id));
  if (index === -1){
    return res.status(404).json({ message: 'User not found' });
  }
  if (name){
    light_status[index].name=name;
  }
  if (power){
    light_status[index].power=power
  }
  res.status(200).json(light_status[index])
}
)
app.listen(port, () => {
  `Server started on port ${port}`;
});
