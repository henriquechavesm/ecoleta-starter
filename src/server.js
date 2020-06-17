const express = require("express");
const server = express();

const db = require("./database/db");

// Deixa a pasta pública acessível através de "/"
server.use(express.static("public"));

//Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

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

server.post("/create-spot", (req, res) => {
  const query = ` INSERT INTO spots (
      name,
      image,
      state,
      city,
      address,
      address2,
      items
      ) VALUES (?, ?, ?, ?, ?, ?, ?);`;

  const values = [
    req.body.name,
    req.body.image,
    req.body.uf,
    req.body.city,
    req.body.address,
    req.body.address2,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Cadastrado com sucesso");
    console.log(this);
    return res.send("ok");
  }

  // //Insert data
  db.run(query, values, afterInsertData);
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

server.get("/delete", (req, res) => {
  db.run(`DELETE FROM spots WHERE id = ?`, [req.query.id], function (err) {
    if (err) {
      // return console.log(err);
      return res.send(`Error.`);
    }
    // console.log("Registro deletado com sucesso!");
    return res.send(`Id ${req.query.id} deleted.`);
  });
});

server.listen(3333);
