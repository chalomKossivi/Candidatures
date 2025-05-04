import ENV from './config/env.js'
import express from 'express'
import connectMongoDB from './config/dbMongo.js'
import candidatureRouter from './routes/candidature.router.js'
import cors from 'cors'

const app = express()

// IMPORT DES ROUTES

// CONNEXION MONGO
connectMongoDB(ENV.URI_MONGO, ENV.DB_NAME);

// MIDDLEWARE    
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5174' }));

// PRIFIX 
app.use('/api/candidatures', candidatureRouter);
// app.use('/api/statistiques');

export default app;