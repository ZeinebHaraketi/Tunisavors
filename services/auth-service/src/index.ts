import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db';
import { authRoutes } from './routes/auth.routes';
//import { userRoutes } from './routes/user.routes';
import path from "path";

// Configuration initiale
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Serve les fichiers statiques
// import fs from 'fs';
// const logoPath = path.join(__dirname, '../public/images/logo.png');
// console.log(fs.existsSync(logoPath)); // Doit retourner `true`

const publicDir = path.resolve(__dirname, '../public'); // Chemin ABSOLU

app.use('/static', express.static(publicDir)); 

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes);
//app.use('/api/users', userRoutes);

// Gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Démarrage du serveur
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error('Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};

startServer();

