const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Pusher = require('pusher');
const crypto = require("crypto");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  encrypted: true
});

app.use(express.static(__dirname+'/dist/gamesFront'));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post('/pusher/auth', function(req, res) {
  let socketId = req.body.socket_id;
  let channel = req.body.channel_name;
  let presenceData = {
    user_id: crypto.randomBytes(16).toString("hex")
  };
  let auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/gamesFront/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening at http://localhost:3000'));