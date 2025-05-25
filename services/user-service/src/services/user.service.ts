import { User } from "../models/User";

export const updateUserProfile = async (userId: string, updates: any) => {
  return await User.findByIdAndUpdate(userId, updates, { new: true });
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};
