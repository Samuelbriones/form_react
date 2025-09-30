const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Agregar usuario
app.post('/usuarios', (req, res) => {
  const { dni, nombres, apellidos, fechaNacimiento, genero, ciudad } = req.body;
  db.run(
    'INSERT INTO usuarios (dni, nombres, apellidos, fechaNacimiento, genero, ciudad) VALUES (?, ?, ?, ?, ?, ?)',
    [dni, nombres, apellidos, fechaNacimiento, genero, ciudad],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Actualizar usuario
app.put('/usuarios/:id', (req, res) => {
  const { dni, nombres, apellidos, fechaNacimiento, genero, ciudad } = req.body;
  db.run(
    'UPDATE usuarios SET dni=?, nombres=?, apellidos=?, fechaNacimiento=?, genero=?, ciudad=? WHERE id=?',
    [dni, nombres, apellidos, fechaNacimiento, genero, ciudad, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
  db.run('DELETE FROM usuarios WHERE id=?', [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dni TEXT NOT NULL,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    fechaNacimiento TEXT NOT NULL,
    genero TEXT NOT NULL,
    ciudad TEXT NOT NULL
  )`);
  
  console.log('Tabla usuarios verificada/creada.');
});
