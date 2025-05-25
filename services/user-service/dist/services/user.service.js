"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.updateUserProfile = void 0;
const User_1 = require("../models/User");
const updateUserProfile = async (userId, updates) => {
    return await User_1.User.findByIdAndUpdate(userId, updates, { new: true });
};
exports.updateUserProfile = updateUserProfile;
const getUserById = async (id) => {
    return await User_1.User.findById(id);
};
exports.getUserById = getUserById;
