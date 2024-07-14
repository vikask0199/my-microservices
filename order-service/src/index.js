const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {  });

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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
