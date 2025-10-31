// Carrega les variables d'entorn del fitxer .env
require('dotenv').config();

// Importa les llibreries necessàries
const express = require('express');
const connectDB = require('./config/db');

// Importa les rutes de productes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

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

// ✅ REGISTRA TODAS LAS RUTAS (FALTABAN ESTAS)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Configura el port (agafa el del .env o 3000 per defecte)
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escoltant al port ${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('  Products:  http://localhost:3000/api/products');
  console.log('  Users:     http://localhost:3000/api/users');
  console.log('  Orders:    http://localhost:3000/api/orders');
  console.log('  Payments:  http://localhost:3000/api/payments');
});