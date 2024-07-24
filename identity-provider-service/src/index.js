const express = require('express');
const app = express();
const port = 5000;

app.get('/auth', (req, res) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
    res.status(200).send('Authorized');
});

app.listen(port, () => {
  console.log(`Auth service listening at http://localhost:${port}`);
});