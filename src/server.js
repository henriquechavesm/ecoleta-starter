const express = require("express");
const server = express();

// Deixa a pasta pública acessível através de "/"
server.use(express.static("public"));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render(
    "index.html",
    // {
    //   title: "Seu marketplace de coleta de resíduos.",
    // }
  );
});

server.get("/create-spot", (req, res) => {
  return res.render("create-spot.html");
});

server.get("/search-results", (req, res) => {
  return res.render("search-results.html");
});

server.listen(3333);
