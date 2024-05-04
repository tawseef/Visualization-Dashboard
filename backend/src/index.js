const mongoose = require('mongoose');
const app = require("./app");
const port = 8082;
// const DB_URL = "mongodb+srv://admin:Password123one@coffee.jqb0kt3.mongodb.net/?retryWrites=true&w=majority&appName=coffee";
const DB_URL = "mongodb+srv://adminuser:passWord123one@cofferdb.mfuwob1.mongodb.net/?retryWrites=true&w=majority&appName=cofferdb";

app.listen(port, ()=>{
    console.log(`Listening to ${port}`);
})

mongoose.connect(DB_URL).then(()=>{
  console.log("Connected To MongoDB--");
}).catch((e)=> console.log("Not Connected To DB--", e))
