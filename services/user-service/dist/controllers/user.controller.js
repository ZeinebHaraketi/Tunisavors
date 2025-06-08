"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileUser = exports.getToken = exports.getAllUsers = exports.updateProfile = void 0;
exports.updateProfilePhoto = updateProfilePhoto;
const user_service_1 = require("../services/user.service");
const imagekit_1 = require("../utils/imagekit");
const User_1 = require("../models/User");
const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = { ...req.body };
        if (req.file) {
            const base64 = req.file.buffer.toString("base64");
            const uploadRes = await imagekit_1.imagekit.upload({
                file: base64,
                fileName: `profile_${userId}_${Date.now()}`,
                folder: "/profiles",
            });
            updates.photoProfil = uploadRes.url;
        }
        const user = await (0, user_service_1.updateUserProfile)(userId, updates);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};
exports.updateProfile = updateProfile;
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
exports.getAllUsers = getAllUsers;
const getToken = async (req, res) => {
    const user = await User_1.User.findOne({ email: req.params.email });
    if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
        return; // <-- juste return ici, ne retourne pas res
    }
    res.json({ accessToken: user.accessToken });
    return; // optionnel
};
exports.getToken = getToken;
async function updateProfilePhoto(req, res) {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'Image manquante.' });
            return;
        }
        const userId = req.params.id;
        const fileBuffer = req.file.buffer;
        const originalName = req.file.originalname;
        const mimeType = req.file.mimetype;
        const imageUrl = await (0, user_service_1.uploadImage)(fileBuffer, originalName, mimeType);
        await (0, user_service_1.updateUserProfilePhoto)(userId, imageUrl);
        res.status(200).json({ message: 'Photo de profil mise à jour.', photoProfil: imageUrl });
    }
    catch (error) {
        console.error('Erreur updateProfilePhoto:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
}
//Update Profile User =====> TRUE
const countries_1 = require("../utils/countries");
const updateProfileUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { nom, prenom, dateNaissance, localisation, nationalite, langue, bio, preferencesCulinaires, } = req.body;
        const updateData = {
            nom,
            prenom,
            dateNaissance,
            localisation,
            langue,
            bio,
            preferencesCulinaires,
        };
        if (nationalite) {
            // Utilise la fonction pour transformer "Tunisia" en "tn"
            updateData.nationalite = (0, countries_1.getCountryCode)(nationalite);
        }
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });
        const updatedUser = await (0, user_service_1.updateUserProfile)(userId, updateData);
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Error updateProfileUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateProfileUser = updateProfileUser;
