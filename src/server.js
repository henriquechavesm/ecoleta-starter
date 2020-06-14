const express = require("express");
const server = express();

// Deixa a pasta pública acessível através de "/"
server.use(express.static("public"));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

server.get("/create-spot", (req, res) => {
  res.sendFile(__dirname + "/views/create-spot.html");
});

server.get("/search-results", (req, res) => {
  res.sendFile(__dirname + "/views/search-results.html");
});

server.listen(3333);
