const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use("/api", require("./userRoutes"))
// app.use('/api', Router)

try {
  mongoose.connect('mongodb+srv://ichraf:ichrafsaid1995@cluster0.q8edrug.mongodb.net/CPMongoose?retryWrites=true&w=majority')
  console.log("database connected");
} catch (error) {
  console.log("error connected");
}



app.listen(6000, (err) => {
  err ? console.log(err) : console.log('server is running on http://localhost:6000')
});