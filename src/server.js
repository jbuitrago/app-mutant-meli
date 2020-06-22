import express, { urlencoded, json } from 'express'
// Importing Routes
import IndexRoutes from './routes/index'
import MutantRoutes from './routes/mutant.routes'
import StatsRoutes from './routes/stats.routes'
require('./database');
const app = express();
const mongoose = require('mongoose');

app.set('port', process.env.PORT);

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
app.use(IndexRoutes);
app.use('/api/v1/mutant', MutantRoutes);
app.use('/api/v1/stats', StatsRoutes);


export default app;