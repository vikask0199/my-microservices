const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const MONGO_URI="mongodb://ms:mstest@192.168.29.104:27017/?authSource=ms_testing"
const PORT=4000

const app = express();
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {  });

const orderSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  userId: String
});

const Order = mongoose.model('Order', orderSchema);

app.post('/order', async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/order', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get(',', async(req, res)=>{
  res.send('Hello from Order Service')
})

const port = PORT;
app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
