import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import busRoutes from './routes/busRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import planeRoutes from './routes/planeRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

const specs = YAML.load('./public/bundled.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/buses', busRoutes);
app.use('/trains', trainRoutes);
app.use('/planes', planeRoutes);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
