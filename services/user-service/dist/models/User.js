"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    // Champs requis
    email: { type: String, required: true, unique: true },
    nom: { type: String },
    prenom: { type: String },
    role: {
        type: String,
        enum: ['admin', 'local', 'tourist', 'partner'],
        default: 'tourist'
    },
    permissions: [{ type: String }], // Ex: ['read:recipes', 'write:blog']
    // Auth Magic Link
    verifToken: { type: String },
    verifTokenExpires: { type: Date },
    accessToken: { type: String },
    isVerified: { type: Boolean, default: false },
    // Infos supplémentaires
    dateNaissance: { type: Date },
    localisation: { type: String }, // Ville/région
    nationalite: { type: String },
    bio: { type: String },
    photoProfil: { type: String },
    preferencesCulinaires: [{ type: String }],
    langue: { type: String }, // Ville/région
    historique: [{
            type: {
                type: String, // 'atelier', 'réservation', etc.
            },
            date: Date,
            details: String,
        }],
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
