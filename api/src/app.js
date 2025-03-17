import express from 'express';
import swaggerUi from 'swagger-ui-express';
import pedidosRoutes from './routes/pedidosRoutes.js';
import revendasRoutes from './routes/revendasRoutes.js';
import integracaoRoutes from './routes/integracaoRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerSpec from './config/swagger.js';
import client from 'prom-client';
import logger from './config/logger.js';

const app = express();
 

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração das requisições HTTP em milissegundos',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000]  
});

app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : req.path, code: res.statusCode });
  });
  next();
});

// Middleware de logging para todas as requisições
app.use((req, res, next) => {  
  logger.info(`Requisição recebida: ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    requestId: req.headers['x-request-id'] || 'não disponível'
  });

  const start = Date.now();
  
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    
    logger.info(`Resposta enviada: ${res.statusCode}`, {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: duration,
      requestId: req.headers['x-request-id'] || 'não disponível'
    });
    
    return originalEnd.call(this, chunk, encoding);
  };
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', pedidosRoutes);
app.use('/api', revendasRoutes);
app.use('/api', integracaoRoutes);

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.get('/health', (req, res) => {
  const healthcheck = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    api: {
      status: 'UP' 
    }
  };  
  res.status(200).json(healthcheck);
});

app.use(errorHandler);

export default app;