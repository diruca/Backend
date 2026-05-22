require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const requestId = require('./middleware/requestId');
const httpLogger = require('./middleware/httpLogger');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');



const app = express();

app.use(requestId);
app.use(httpLogger);

// Middleware CORS manual per evitar problemes amb el frontend
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, stripe-signature');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Rutes que necessiten body raw (com Webhooks de Stripe) han d'anar ABANS d'express.json()
// O configurar express.json() per saltar-se algunes rutes. 
// Aquí usarem la ruta de checkout específica que ja té el seu propi parser.
app.use('/api/checkout', checkoutRoutes);

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
app.use('/api', healthRoutes);

// Endpoint temporal per simular error de debug per observabilitat
app.get('/api/debug/error', (req, res, next) => {
  next(new Error('Error de prova per observabilitat'));
});

// Documentació de l'API amb Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware global d'errors
app.use(errorHandler);

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