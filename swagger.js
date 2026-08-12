const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GymManager API',
    description: 'API for managing gym members, membership plans, trainers, and workout sessions'
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);