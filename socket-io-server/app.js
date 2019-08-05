const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(index);
var data={};
app.post('/api', function (req, res) {
  // console.log(req.body);
  res.status(200).send(req.body);
  data=req.body;
  console.log(data);
 
});
 
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
const getApiAndEmit = async socket => {
  try {
    // const res = await axios.get(
    //   "https://api.darksky.net/forecast/2bda49bb5b683ed05b7b19c098bc4c5f/12.9716,77.5946"
    // ); // Getting the data from DarkSky
     socket.emit("BuildStatus", data.status);
     socket.emit("URL", data.url);
     socket.emit("BuildNumber", data.buildnumber); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
