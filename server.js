const mongoose = require('mongoose')
const express = require("express");
const path = require("path");
const apiRoutes = require('./routes/api-routes')
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const uniqId = require('uniqid');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dailydoodles");

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())
const ioOptions = {
  cors: true,
  origins: ["http://127.0.0.1:3001"],
  methods: ["GET", "POST"],
  credentials: false
}
const io = new Server(server, ioOptions);
console.log('io', io.opts)
//io.set('origins', 'localhost:3000');

//app handles routes
//app is used to create (http)server
//(http)server is used to create socket.io Server

let lefty = true //the right approach is a hash table? array of objects
const connectors = [
  //   { righty:"",
  //     lefty: "",
  //     lonely:true,
  //     waiting:false,
  //     connUid: uniqId()
  //  }
]
async function makeConnections(payload, cb) {
  console.log(payload)
  //console.log(this)
  this.emit("flash", { mob: true })
}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.emit("FromAPI", `Tell me your name`)
  lefty = !lefty //this is gonna scale poorly
  socket.on("connectionPlease", makeConnections)

});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(apiRoutes)

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
