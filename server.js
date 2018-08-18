const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname + '/')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
  console.log('Listening on port: ' + port);
});