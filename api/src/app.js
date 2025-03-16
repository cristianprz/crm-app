const express = require('express');
const pedidosRoutes = require('./routes/pedidosRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pedidos', pedidosRoutes); 

app.use(errorHandler);

module.exports = app;