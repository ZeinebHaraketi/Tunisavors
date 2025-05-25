"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { adminSideBarLinks } from "@/constants";

type User = {
  name: string;
  email: string;
};

type SidebarLink = {
  img: string;
  text: string;
  route?: string;
  children?: {
    text: string;
    route: string;
  }[];
};

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5002/api/users/me", {
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

  const toggleMenu = (text: string) => {
    setOpenMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  return (
    <aside className="flex flex-col justify-between h-screen w-64 bg-rougebrique text-red-800 p-4">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/tunisavors.png"
            alt="TuniSavors Logo"
            width={72}
            height={40}
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {adminSideBarLinks.map((link: SidebarLink) => {
            const isSelected =
              (link.route &&
                link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            if (link.route) {
              return (
                <Link href={link.route} key={link.route}>
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-orangebrule text-red-800"
                        : "hover:bg-rougebriquee"
                    }`}
                  >
                    <Image
                      src={link.img}
                      alt={link.text}
                      width={20}
                      height={20}
                      className={`object-contain ${isSelected ? "invert" : ""}`}
                    />
                    <span className="text-sm font-medium">{link.text}</span>
                  </div>
                </Link>
              );
            }

            // Parent without route, toggle children
            return (
              <div key={link.text}>
                <div
                  onClick={() => toggleMenu(link.text)}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-rougebriquee"
                >
                  <Image
                    src={link.img}
                    alt={link.text}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="text-sm font-medium">{link.text}</span>
                </div>
                {openMenus[link.text] && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {link.children?.map((child) => {
                      const isChildSelected = pathname === child.route;
                      return (
                        <Link href={child.route} key={child.route}>
                          <span
                            className={`text-sm p-2 rounded cursor-pointer transition-colors ${
                              isChildSelected
                                ? "bg-orangebrule text-red-800"
                                : "hover:bg-rougebriquee"
                            }`}
                          >
                            {child.text}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      {user && (
        <div className="flex items-center gap-3 mt-10 border-t border-white/30 pt-4">
          <div className="flex items-center justify-center bg-beigesable text-rougebrique font-bold rounded-full w-10 h-10">
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-red-700">{user.email}</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
