import { Router } from 'express';
import { upload } from "../middlewares/upload.middleware";
import { getAllUsers, getToken, updateProfile } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';


export const userRoutes = Router();

userRoutes.put("/:id", upload.single("photoProfil"), updateProfile);

userRoutes.get('/admin', isAuthenticated, authorizeRoles('admin'), getAllUsers)


userRoutes.get('/token/:email', getToken)




export default userRoutes;