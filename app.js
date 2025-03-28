import ENV from './backend/config/env.js'
import express from 'express'
import connectMongoDB from './backend/config/dbMongo.js'
import candidatureRouter from './router/candidature.router.js'

const app = express()

// IMPORT DES ROUTES

// CONNEXION MONGO
connectMongoDB(ENV.URI_MONGO_LOCAL, ENV.DB_NAME);

// MIDDLEWARE    
app.use(express.json())

// PRIFIX 
app.use('/api/candidatures', candidatureRouter);
// app.use('/api/statistiques');

export default app;