const express = require("express");
const server = express();

const db = require("./database/db");

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
  db.all(`SELECT * FROM spots`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    //Mostrar a página com os dados do banco de dados
    return res.render("search-results.html", { spots: rows });
  });
});

server.listen(3333);
