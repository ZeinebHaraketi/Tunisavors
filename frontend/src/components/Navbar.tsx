"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLangMenu = () => setShowLangMenu(!showLangMenu);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.replace("/sign-in");
  };

  return (
    <nav className="bg-white p-4 shadow-md text-red-800 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/tunisavors.png" alt="TuniSavors Logo" width={72} height={36} priority />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="block hover:text-red-500">Home</Link>
          <Link href="/discover" className="block hover:text-red-500">Discover Tunisia</Link>
          <Link href="/recipes" className="block hover:text-red-500">Recipes</Link>
          <Link href="/cook" className="block hover:text-red-500">Cook with locals</Link>
          <Link href="/community" className="block hover:text-red-500">Community</Link>
          <Link href="/contact" className="block hover:text-red-500">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <Image
                src={user.photoProfile || "/default-avatar.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={toggleUserMenu}
              />
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 text-sm">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-red-100">👤 Mon profil</Link>
                  <Link href="/settings" className="block px-4 py-2 hover:bg-red-100">⚙️ Paramètres</Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-700"
                  >
                    🚪 Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/sign-up" className="bg-red-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Register
            </Link>
          )}

          <button onClick={toggleLangMenu} className="hover:text-red-500 relative" title="Change language">
            <Globe size={22} />
          </button>

          {showLangMenu && (
            <div className="absolute top-10 right-0 bg-white border rounded-md shadow-md text-sm">
              <Link href="/fr" className="block px-4 py-2 hover:bg-red-100">🇫🇷 Français</Link>
              <Link href="/en" className="block px-4 py-2 hover:bg-red-100">🇬🇧 English</Link>
              <Link href="/es" className="block px-4 py-2 hover:bg-red-100">🇪🇸 Español</Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={toggleMenu} className="md:hidden text-red-800">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 pb-4 text-red-800">
          <Link href="/" className="block hover:text-red-500">Home</Link>
          <Link href="/discover" className="block hover:text-red-500">Discover Tunisia</Link>
          <Link href="/recipes" className="block hover:text-red-500">Recipes</Link>
          <Link href="/cook" className="block hover:text-red-500">Cook with locals</Link>
          <Link href="/community" className="block hover:text-red-500">Community</Link>
          <Link href="/contact" className="block hover:text-red-500">Contact</Link>
          {!user && (
            <Link href="/sign-up" className="block mt-2 bg-red-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600">
              Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
