"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils/db");
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Configuration initiale
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
// Serve les fichiers statiques
// import fs from 'fs';
// const logoPath = path.join(__dirname, '../public/images/logo.png');
// console.log(fs.existsSync(logoPath)); // Doit retourner `true`
const publicDir = path_1.default.resolve(__dirname, '../public'); // Chemin ABSOLU
exports.app.use('/static', express_1.default.static(publicDir));
// Middlewares
// app.use(cors());
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // URL frontend Next.js
    credentials: true,
}));
exports.app.use(express_1.default.json());
// Connexion à la base de données
(0, db_1.connectDB)();
// Routes
exports.app.use('/api/users', userRoutes_1.default);
exports.app.get('/api/test', (req, res) => {
    res.json({ message: 'Serveur OK' });
});
// Gestion des erreurs
exports.app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});
// Démarrage du serveur
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        exports.app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
};
startServer();
