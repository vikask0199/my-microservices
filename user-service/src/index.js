const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


const MONGO_URI="mongodb://ms:mstest@192.168.29.104:27017/?authSource=ms_testing"
const PORT=3000


const app = express();
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/user', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/user', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', async(req, res)=>{
  res.send('Hello from User Service')
})

const port = PORT;
app.listen(port, () => {
  console.log(`User service running on port ${port}`);
});
