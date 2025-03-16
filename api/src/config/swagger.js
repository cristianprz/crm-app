import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Pedidos de Bebidas',
      version: '1.0.0',
      description: 'API para gerenciar pedidos de bebidas',
      contact: {
        name: 'API Support',
        email: 'suporte@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // paths to files containing annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;