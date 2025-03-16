import express from 'express';
import swaggerUi from 'swagger-ui-express';
import pedidosRoutes from './routes/pedidosRoutes.js';
import revendasRoutes from './routes/revendasRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', pedidosRoutes);
app.use('/api', revendasRoutes);

app.use(errorHandler);

export default app;