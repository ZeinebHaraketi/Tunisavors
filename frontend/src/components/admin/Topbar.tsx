"use client";

import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

const Topbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3002/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-red-800 text-red-800 shadow">
      <div>
        <h2 className="text-xl font-bold">
          {user?.name || "Bienvenue"}
        </h2>
        <p className="text-sm text-white/80">
          Accédez à votre espace d’administration
        </p>
      </div>

      <div className="flex items-center gap-3 bg-white text-red-800 px-4 py-2 rounded-full shadow">
        <p className="text-sm font-medium">{user?.email || "admin@tunisavors.com"}</p>
      </div>
    </header>
  );
};

export default Topbar;
