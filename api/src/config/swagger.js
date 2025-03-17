import swaggerJsdoc from 'swagger-jsdoc';
import { schemas, paths } from './swagger/index.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Distribuidora de Sucos',
      version: '1.0.0',
      description: 'API para gerenciamento de revendas, clientes e pedidos de sucos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      schemas,
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'API Key para autenticação'
        }
      }
    },
    security: [
      {
        apiKey: []
      }
    ],
    paths
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;