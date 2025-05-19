import { User } from "@/interfaces/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

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
