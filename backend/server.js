require("dotenv").config(); // Charge les variables d'environnement depuis un fichier .env
const express = require("express"); // Importe Express pour gérer le serveur
const mongoose = require("mongoose"); // Importe Mongoose pour interagir avec MongoDB
const cors = require("cors"); // Importe CORS pour gérer les accès entre le front-end et le back-end
const bodyParser = require("body-parser"); // Permet de parser les requêtes entrantes en JSON

const app = express(); // Initialise l'application Express
const PORT = process.env.PORT || 5000; // Définit le port du serveur (récupéré depuis .env ou par défaut 5000)

// Middleware
app.use(cors()); // Active CORS pour permettre les requêtes depuis d'autres domaines
app.use(bodyParser.json()); // Permet à Express de comprendre les requêtes JSON

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, { // Connexion à la base de données MongoDB avec l'URI stocké dans .env
    useNewUrlParser: true, // Utilisation du nouveau parser d'URL de MongoDB
    useUnifiedTopology: true, // Activation du nouveau moteur de gestion des connexions
  })
  .then(() => console.log("✅ MongoDB connecté")) // Message de succès si la connexion réussit
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err)); // Message d'erreur si la connexion échoue

// Route de test pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API du Candidature Tracker"); // Répond avec un message simple
});

const candidatureRoutes = require("./routes/candidatureRoutes");
app.use("/api", candidatureRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`); // Affiche un message de confirmation dans la console
});
