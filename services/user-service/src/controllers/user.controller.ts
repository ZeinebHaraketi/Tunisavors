import { Request, Response } from "express";
import { updateUserProfile, getUserById, updateUserProfilePhoto, uploadImage } from "../services/user.service";
import { imagekit } from "../utils/imagekit";
import { User } from "../models/User";

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
 try {
    const userId = req.params.id;
    const updates = { ...req.body };

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const uploadRes = await imagekit.upload({
        file: base64,
        fileName: `profile_${userId}_${Date.now()}`,
        folder: "/profiles",
      });
      updates.photoProfil = uploadRes.url;
    }

    const user = await updateUserProfile(userId, updates);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}


export const getToken = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
    return; // <-- juste return ici, ne retourne pas res
  }
  res.json({ accessToken: user.accessToken });
  return; // optionnel
}






export async function updateProfilePhoto(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Image manquante.' });
      return;
    }

    const userId = req.params.id;
    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;
    const mimeType = req.file.mimetype;

    const imageUrl = await uploadImage(fileBuffer, originalName, mimeType);
    await updateUserProfilePhoto(userId, imageUrl);

    res.status(200).json({ message: 'Photo de profil mise à jour.', photoProfil: imageUrl });
  } catch (error) {
    console.error('Erreur updateProfilePhoto:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}





//Update Profile User =====> TRUE
import { getCountryCode } from '../utils/countries';


export const updateProfileUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const {
      nom,
      prenom,
      dateNaissance,
      localisation,
      nationalite,
      langue,
      bio,
      preferencesCulinaires,
    } = req.body;

    const updateData: any = {
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
      updateData.nationalite = getCountryCode(nationalite);
    }

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedUser = await updateUserProfile(userId, updateData);

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updateProfileUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};







