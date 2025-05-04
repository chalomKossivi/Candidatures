// ---------------------------
// server.js ou app.js
// ---------------------------
import ENV from './config/env.js';
import express from 'express';
import connectMongoDB from './config/dbMongo.js';
import candidatureRouter from './routes/candidature.router.js';
import cors from 'cors';

const app = express();

// Connexion à la BDD
connectMongoDB(ENV.URI_MONGO, ENV.DB_NAME);

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Routes
app.use('/api/candidatures', candidatureRouter);

export default app;