import swaggerJsdoc from 'swagger-jsdoc';
import { schemas, paths } from './swagger/index.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Distribuidora',
      version: '1.0.0',
      description: 'API para gerenciamento de revendas e  pedidos ',
      contact: {
        name: 'API Support',
        email: 'suporte@exemplo.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      schemas
    },
    paths
  },
  apis: [], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;