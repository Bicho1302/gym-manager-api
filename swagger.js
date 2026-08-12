const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'GymManager API',
    description: 'API for managing gym members, membership plans, trainers, and workout sessions'
  },
  host: isProduction
    ? 'gym-manager-api-fd5i.onrender.com'
    : 'localhost:3000',
  schemes: isProduction ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);