import { Router } from 'express';
import { upload } from "../middlewares/upload.middleware";
import { getAllUsers, getToken, updateProfile, updateProfilePhoto, updateProfileUser } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';


export const userRoutes = Router();

userRoutes.put("/:id", upload.single("photoProfil"), updateProfile);

userRoutes.get('/all', getAllUsers);

userRoutes.get('/admin', isAuthenticated, authorizeRoles('admin'), getAllUsers)


userRoutes.get('/token/:email', getToken)


userRoutes.put('/updatePhoto/:id', upload.single('photoProfil'), updateProfilePhoto);

userRoutes.put('/updateProfile/:id', updateProfileUser);


userRoutes.get('/test', (req, res) => {
  res.json({ message: 'Route test OK' });
});


export default userRoutes;