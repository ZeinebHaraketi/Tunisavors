import { Request, Response } from "express";
import { updateUserProfile, getUserById } from "../services/user.service";
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




