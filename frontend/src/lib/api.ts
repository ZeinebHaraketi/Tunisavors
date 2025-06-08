import { User } from "@/interfaces/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const API_BASE_URL_USER = process.env.NEXT_PUBLIC_API_URL_USER || "http://localhost:3002/api";


export async function registerUser(email: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Une erreur est survenue");
  }

  return await response.json();
}


export async function loginUser(email: string): Promise<{ message: string }> {

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erreur lors de la connexion");
  }

  return await response.json();
}


export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL_USER}/users/all`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la récupération des utilisateurs");
  }

  return await response.json();
}


// lib/api.ts
export const verifyUserWithMagicLink = async (token: string, email: string) => {
  const res = await fetch(
    `${API_BASE_URL}/auth/verify?token=${token}&email=${email}`
  );

  if (!res.ok) {
    throw new Error("Vérification échouée");
  }

  const data = await res.json();
  return data; // { accessToken, user }
};

export const uploadProfilePhoto = async (userId: string, file: File) => {
  const formData = new FormData();
  formData.append('photoProfil', file);

  const res = await fetch(`${API_BASE_URL_USER}/users/updatePhoto/${userId}`, {
    method: 'PUT',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Erreur lors de la mise à jour de la photo.');
  }

  const data = await res.json();
  return data; // { message: string, photoProfil: string }
};




export async function updateUserProfile(userId: string, data: any) {
  const res = await fetch(`${API_BASE_URL_USER}/users/updateProfile/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur lors de la mise à jour");

  return res.json();
}

