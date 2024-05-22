const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.join(__dirname, 'db.json');

function readDB() {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data).productos;
}

function writeDB(data) {
    const db = { productos: data };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// Route to list products
app.get('/productos', (req, res) => {
    const productos = readDB();
    res.json(productos);
});

// Route to add a new product
app.post('/productos', (req, res) => {
    const { nombre, precio, imagen } = req.body;
    const productos = readDB();
    const id = (Math.random().toString(36).substr(2, 4)); // Generate random ID
    const nuevoProducto = { id, nombre, precio, imagen };
    productos.push(nuevoProducto);
    writeDB(productos);
    res.json(nuevoProducto);
});

// Route to delete a product
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    let productos = readDB();
    productos = productos.filter(producto => producto.id !== id);
    writeDB(productos);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


