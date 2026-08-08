const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GymManager API',
    description: 'API for managing gym members and membership plans'
  },
  host: 'gym-manager-api-fd5i.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);