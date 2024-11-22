// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Bookstore API',
    version: '1.0.0',
    description: 'API documentation for the bookstore',
  },
  servers: [
    {
      url: 'https://api.teasonmike.io.vn/api', // Your API server URL
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Path to API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
