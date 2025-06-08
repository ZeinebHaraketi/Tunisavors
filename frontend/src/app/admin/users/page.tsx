"use client";

import { Flag } from "@/components/Flag";
import { User } from "@/interfaces/user";
import { fetchAllUsers } from "@/lib/api";
import { useEffect, useState } from "react";

const roleColors: Record<string, string> = {
  admin: "bg-red-100 text-red-800",
  local: "bg-green-100 text-green-800",
  tourist: "bg-blue-100 text-blue-800",
  partner: "bg-yellow-100 text-yellow-800",
};

function getFlagEmoji(country: string | undefined) {
  if (!country) return "❓";
  const code = country.trim().slice(0, 2).toUpperCase();
  return code.replace(/./g, (char) =>
    String.fromCodePoint(127397 + char.charCodeAt(0))
  );
}

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-red-700 font-bold mb-4">La liste des Utilisateurs</h1>
      <br />
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Photo</th>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Rôle</th>
                <th className="px-6 py-3">Nationalité</th>
                <th className="px-6 py-3">Vérifié</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoProfil}
                          alt={user.nom || "Photo de profil"}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {user.nom || "-"} {user.prenom || ""}
                    </td>

                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          roleColors[user.role ?? "tourist"]
                        }`}
                      >
                        {user.role ?? "tourist"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Flag
                        countryCode={user.nationalite?.toLowerCase() || "xx"}
                        alt={user.nationalite}
                        className="mx-6 w-7 h-5" // centrée et un peu plus grande
                      />
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                          user.isVerified
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isVerified ? "Vérifié" : "Non vérifié"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 flex items-center justify-end">
                      {" "}
                      <button
                        title="Voir"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />{" "}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                          />{" "}
                        </svg>{" "}
                      </button>{" "}
                      <button
                        title="Modifier"
                        className="text-yellow-600 hover:text-yellow-800 ml-3"
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                          />{" "}
                        </svg>{" "}
                      </button>{" "}
                      <button
                        title="Supprimer"
                        className="text-red-600 hover:text-red-800 ml-3"
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />{" "}
                        </svg>{" "}
                      </button>{" "}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
