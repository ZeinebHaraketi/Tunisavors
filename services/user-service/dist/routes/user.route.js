"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const user_controller_1 = require("../controllers/user.controller");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.put("/:id", upload_middleware_1.upload.single("photoProfil"), user_controller_1.updateProfile);
exports.default = exports.userRoutes;
