const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

db.serialize(() => {
  // Create table
  db.run(`
  CREATE TABLE IF NOT EXISTS spots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image TEXT,
      state TEXT,
      city TEXT,
      address TEXT,
      address2 TEXT,
      items TEXT
  );
`);

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
    "Colectoria",
    "https://images.unsplash.com/photo-1585663928542-76f3bf369020?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    "SC",
    "Rio do Sul",
    "Rua Guilherme Gemballa, Jardim América",
    "Nº 260",
    "Resíduos Eletrônicos, Lâmpadas",
  ];

  const values = [
    "Papersider",
    "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
    "SC",
    "Rio do Sul",
    "Rua Guilherme Gemballa, Jardim América",
    "Nº 260",
    "Papéis e Papelão",
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Cadastrado com sucesso");
    console.log(this);
  }

  // //Insert data
  db.run(query, values, afterInsertData);

  //Query all data from table
  db.all(`SELECT * FROM spots`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Aqui estão seus registros:");
    console.log(rows);
  });

  //Delete a spot
  db.run(`DELETE FROM spots WHERE id = ?`, [1], function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Registro deletado com sucesso!");
  });
});
