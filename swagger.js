const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GymManager API',
    description: 'API for managing gym members and membership plans'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);