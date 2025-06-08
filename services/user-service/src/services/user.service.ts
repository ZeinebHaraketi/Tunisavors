import { User } from "../models/User";
import { imagekit } from "../utils/imagekit";

export const updateUserProfile = async (userId: string, updates: any) => {
  return await User.findByIdAndUpdate(userId, updates, { new: true });
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};


export async function uploadImage(file: Buffer, fileName: string, mimeType: string): Promise<string> {
  const response = await imagekit.upload({
    file,       // buffer ou base64
    fileName,
    useUniqueFileName: true,
    folder: '/users/profiles',
  });

  return response.url;
}

export async function deleteImage(fileId: string) {
  return await imagekit.deleteFile(fileId);
}


export async function updateUserProfilePhoto(userId: string, photoUrl: string): Promise<void> {
  await User.findByIdAndUpdate(userId, { photoProfil: photoUrl });
}

export const updateProfile = async (userId: string, updateData: Partial<any>) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

