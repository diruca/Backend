// Carrega les variables d'entorn del fitxer .env
require('dotenv').config();

// Importa les llibreries necessàries
const express = require('express');
const connectDB = require('./config/db');

// Importa les rutes de productes
const productRoutes = require('./routes/productRoutes');

// Inicialitza l'app d'Express
const app = express();

// Permet que el servidor entengui dades en format JSON
app.use(express.json());

// Connexió amb MongoDB
connectDB();

// Ruta base de prova
app.get('/', (req, res) => {
  res.send('API Ecommerce en marxa');
});

// Exemple de ruta de test per veure que tot funciona
app.get('/test', (req, res) => {
  res.json({ missatge: 'El backend de Node.js funciona correctament' });
});

// Registra les rutes de productes
app.use('/api/products', productRoutes);

// Configura el port (agafa el del .env o 3000 per defecte)
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
