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

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: "'50mb'" }));
app.use(morgan('dev'))
app.use(cors())
//socketio payload problems https://stackoverflow.com/questions/19917401/error-request-entity-too-large
const ioOptions = {
  cors: true,
  origins: ["http://127.0.0.1:3001"],
  methods: ["GET", "POST"],
  credentials: false
}
const io = new Server(server, ioOptions);
console.log('io', io.opts)

//app handles routes
//app is used to create (http)server
//(http)server is used to create socket.io Server

//let lefty = true //the right approach is a hash table? array of objects
const connections = []// in memory connection persistence
function Connector(name = "anon", id) {
  this.roomId = uniqId()
  this.righty = name
  this.rightyId = id
  this.lefty = ""
  this.leftyId = ""
  this.lonely = true
  this.waiting = false
  // const rightness = Math.floor(Math.random() * 2) ? "righty" : "lefty"
  // rightness ? this.righty = name : this.lefty = name
}

async function makeConnections(payload, cb) {
  let yourMatch;
  const singles = connections.filter(conn => conn.lonely)
  if (singles.length > 0) {
    yourMatch = singles[0]
    yourMatch.lonely = false
    yourMatch.lefty = payload.name
    yourMatch.leftyId = this.id
    this.join(yourMatch.roomId)
    this.to(yourMatch.roomId).emit("notalone", { connection: yourMatch })
  } else {
    yourMatch = new Connector(payload.name, this.id)
    connections.push(yourMatch)

    this.join(yourMatch.roomId)
  }
  console.log(connections)
  cb({ connection: yourMatch })
}

function makeLigaments({ roomId }) {
  // between 2-6 random points
  const min = 2
  const max = 6
  const length = Math.floor(Math.random() * (max - min + 1) + min)
  const ligaments = Array
    .from({ length }, () => 0)
    .map(() => Math.floor((Math.random() * 99) + 1))
  io.to(roomId).emit('newLigaments', { ligaments })
}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.emit("FromAPI", `How you gonna sign`)
  //lefty = !lefty //this is gonna scale poorly
  socket.on("connectionPlease", makeConnections)
  socket.on("ligamentsPlease", makeLigaments)
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
