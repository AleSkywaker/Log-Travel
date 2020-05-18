const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
var mongoose = require('mongoose');

require('dotenv').config();

const middleware = require('./middleware');

// Router
const logs = require('./api/logs');
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hola Alex',
  });
});

app.use('/api/logs', logs);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 2555;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
