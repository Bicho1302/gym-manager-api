const express = require('express');
const dotenv = require('dotenv');


dotenv.config();

const { connectDB } = require('./db/connection');
const membersRoutes = require('./routes/membersRoutes');
const plansRoutes = require('./routes/plansRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/members', membersRoutes);
app.use('/plans', plansRoutes);


app.get('/', (req, res) => {
  res.send('GymManager API is running');
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();