"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const user_service_1 = require("../services/user.service");
const imagekit_1 = require("../utils/imagekit");
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
