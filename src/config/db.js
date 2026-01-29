// Importem la llibreria Mongoose
const mongoose = require('mongoose');

// Definim una funció asíncrona per connectar-nos a MongoDB
const connectDB = async () => {
  try {
    // Intentem fer la connexió amb la URI que tenim al fitxer .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connectat correctament');
  } catch (err) {
    // Si hi ha algun error, el mostrem i aturem l’aplicació
    console.error('Error connectant a MongoDB:', err.message);
    process.exit(1);
  }
};

// Exportem la funció perquè es pugui utilitzar a index.js
module.exports = connectDB;
