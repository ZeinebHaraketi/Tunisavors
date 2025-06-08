"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.put("/:id", upload_middleware_1.upload.single("photoProfil"), user_controller_1.updateProfile);
exports.userRoutes.get('/all', user_controller_1.getAllUsers);
exports.userRoutes.get('/admin', auth_middleware_1.isAuthenticated, (0, role_middleware_1.authorizeRoles)('admin'), user_controller_1.getAllUsers);
exports.userRoutes.get('/token/:email', user_controller_1.getToken);
exports.userRoutes.put('/updatePhoto/:id', upload_middleware_1.upload.single('photoProfil'), user_controller_1.updateProfilePhoto);
exports.userRoutes.put('/updateProfile/:id', user_controller_1.updateProfileUser);
exports.userRoutes.get('/test', (req, res) => {
    res.json({ message: 'Route test OK' });
});
exports.default = exports.userRoutes;
