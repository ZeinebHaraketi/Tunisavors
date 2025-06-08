"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getUserById = exports.updateUserProfile = void 0;
exports.uploadImage = uploadImage;
exports.deleteImage = deleteImage;
exports.updateUserProfilePhoto = updateUserProfilePhoto;
const User_1 = require("../models/User");
const imagekit_1 = require("../utils/imagekit");
const updateUserProfile = async (userId, updates) => {
    return await User_1.User.findByIdAndUpdate(userId, updates, { new: true });
};
exports.updateUserProfile = updateUserProfile;
const getUserById = async (id) => {
    return await User_1.User.findById(id);
};
exports.getUserById = getUserById;
async function uploadImage(file, fileName, mimeType) {
    const response = await imagekit_1.imagekit.upload({
        file, // buffer ou base64
        fileName,
        useUniqueFileName: true,
        folder: '/users/profiles',
    });
    return response.url;
}
async function deleteImage(fileId) {
    return await imagekit_1.imagekit.deleteFile(fileId);
}
async function updateUserProfilePhoto(userId, photoUrl) {
    await User_1.User.findByIdAndUpdate(userId, { photoProfil: photoUrl });
}
const updateProfile = async (userId, updateData) => {
    return await User_1.User.findByIdAndUpdate(userId, updateData, { new: true });
};
exports.updateProfile = updateProfile;
