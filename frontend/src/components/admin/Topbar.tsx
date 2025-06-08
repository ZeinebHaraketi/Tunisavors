"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { User } from "@/interfaces/user";



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
    <header className="w-full flex items-center justify-between px-6 py-4 bg-red-700 text-white shadow">
      <div>
        <h2 className="text-xl font-bold">
          {user?.nom || "Welcome"}
        </h2>
        
      </div>

      <div className="flex items-center gap-3 bg-white text-red-700 px-2 py-2 rounded-full shadow">
        {/* <p className="text-sm font-medium">{user?.email || "admin@tunisavors.com"}</p> */}
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.photoProfil} alt={user?.nom} />
          <AvatarFallback>{getInitials(user?.nom || "A")}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Topbar;
