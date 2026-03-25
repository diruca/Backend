require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');


const app = express();

// Middleware CORS manual per evitar problemes amb el frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Respondre immediatament a la petició preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('API Ecommerce en marxa');
});

app.get('/test', (req, res) => {
  res.json({ missatge: 'El backend de Node.js funciona correctament' });
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

// Documentació de l'API amb Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escoltant al port ${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('  Products:  http://localhost:3000/api/products');
  console.log('  Users:     http://localhost:3000/api/users');
  console.log('  Orders:    http://localhost:3000/api/orders');
  console.log('  Payments:  http://localhost:3000/api/payments');
  console.log('  Auth:      http://localhost:3000/api/auth');
});