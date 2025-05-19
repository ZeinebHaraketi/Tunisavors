import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

export const authRoutes = Router();

// Auth sans mot de passe
authRoutes.post('/magic-link', authController.requestMagicLink);
authRoutes.get('/verify', authController.verifyMagicLink);

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);

export default authRoutes;