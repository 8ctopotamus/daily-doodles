const mongoose = require('mongoose')
const express = require("express");
const path = require("path");
const apiRoutes = require('./routes/api-routes')
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors')
const morgan = require('morgan')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dailydoodles");

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const ioOptions = {
  cors: true,
  origins: ["http://127.0.0.1:3000"],
}
const io = new Server(server, ioOptions);
//io.set('origins', 'localhost:3000');

//app handles routes
//app is used to create (http)server
//(http)server is used to create socket.io Server

io.on('connection', (socket) => {
  socket.emit("FromAPI", "This is API speaking")
  console.log('a user connected', socket);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

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
