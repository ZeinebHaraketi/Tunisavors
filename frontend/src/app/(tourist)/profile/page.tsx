"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  Compass,
  BookOpen,
  Pencil,
  X,
  UploadCloud,
  ChevronDownIcon,
} from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { updateUserProfile, uploadProfilePhoto } from "@/lib/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import CountrySelect from "@/components/CountrySelect";
import { PreferencesInput } from "@/components/PreferencesInput";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedFName, setEditedFName] = useState("");
  const [editedDateofBirth, setEditedDateofBirth] = useState("");
  const [editedNationalite, setEditedNationalite] = useState("");

  const [editedPreferences, setEditedPreferences] = React.useState<string[]>(
    []
  ); // doit être un tableau !
  const [editedLanguage, setEditedLanguage] = useState("");
  const [editedLocalisation, setEditedLocalisation] = useState("");

  const [editedBio, setEditedBio] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner une image valide.");
        return;
      }

      setError(null);
      setUploading(true);
      const url = URL.createObjectURL(file);
      setPreviewSrc(url);

      try {
        const data = await uploadProfilePhoto(user._id, file);
        setCurrentPhoto(data.photoProfil);

        const updatedUser = { ...user, photoProfile: data.photoProfil };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        setShowUploader(false);
      } catch (err: any) {
        setError(err.message || "Erreur lors de l'upload");
      } finally {
        setUploading(false);
        URL.revokeObjectURL(url);
        setPreviewSrc(null);
      }
    },
    [user]
  );

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (!storedUser || storedUser.role !== "tourist") {
      router.replace("/auth/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user?.photoProfile) {
      setCurrentPhoto(user.photoProfile);
    }
  }, [user]);

  // 👍 ici maintenant, plus aucun hook après ce point !
  if (!user) return null;

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const imageSrc =
    previewSrc ||
    (currentPhoto
      ? currentPhoto.startsWith("http") || currentPhoto.startsWith("/")
        ? currentPhoto
        : `/uploads/${currentPhoto}` // Adaptez ce chemin à votre structure
      : "/default-avatar.jpg");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedName.trim()) {
      alert("Le nom ne peut pas être vide.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("nom", editedName.trim());
      formData.append("prenom", editedFName.trim());
      formData.append("dateNaissance", editedDateofBirth.trim());
      formData.append("nationalite", editedNationalite.trim());
      formData.append(
        "preferencesCulinaires",
        Array.isArray(editedPreferences)
          ? editedPreferences.join(",")
          : String(editedPreferences) // fallback si jamais ce n'est pas un tableau
      );
      formData.append("langue", editedLanguage.trim());
      formData.append("localisation", editedLocalisation.trim());
      formData.append("bio", editedBio.trim());

      const updated = await updateUserProfile(user._id, formData);

      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setIsEditing(false);
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour du profil :", err);
      alert("Erreur lors de la mise à jour du profil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen bg-cover bg-center py-10 px-6 sm:px-10"
        style={{ backgroundImage: "url('/bg-tourist-p.jpg')" }}
      >
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl border border-red-100">
          <h1 className="text-3xl font-bold text-[#A12312] mb-6">
            👋 Bienvenue, {user.nom?.split(" ")[0] || "Explorateur"}
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-6 relative">
            <div className="relative w-[120px] h-[120px]">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt="Photo de profil"
                  fill
                  sizes="150px"
                  className="rounded-full border-4 border-[#D65A31] shadow-md object-cover"
                />
              )}
              <button
                title="Modifier la photo"
                className="absolute bottom-1 right-1 bg-white hover:bg-[#A12312] text-[#A12312] hover:text-white p-1 rounded-full shadow transition"
                onClick={() => setShowUploader((show) => !show)}
                disabled={uploading}
              >
                <Pencil size={16} />
              </button>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xl font-semibold text-[#A12312]">
                {user.nom + " " + user.prenom || user.email}
              </p>
              <p className="text-gray-500">{user.email}</p>
              <div className="mt-4 flex justify-center sm:justify-start gap-4">
                <button
                  className="flex items-center gap-2 bg-[#D65A31] text-white px-4 py-2 rounded-lg hover:bg-[#A12312] transition"
                  onClick={() => router.push("/exploration")}
                >
                  <Compass size={18} />
                  Explore the regions{" "}
                </button>
                <button
                  className="flex items-center gap-2 bg-[#708238] text-white px-4 py-2 rounded-lg hover:bg-[#A12312] transition"
                  onClick={() => router.push("/mes-decouvertes")}
                >
                  <BookOpen size={18} />
                  My adventures{" "}
                </button>

                <button
                  className="flex items-center gap-2 bg-[#D9B08C] text-white px-4 py-2 rounded-lg hover:bg-[#A12312] transition"
                  onClick={() => {
                    setIsEditing((prev) => !prev);
                    setEditedName(user.nom || "");
                    setEditedFName(user.prenom || "");
                    setEditedDateofBirth(
                      user.dateNaissance ? user.dateNaissance.split("T")[0] : ""
                    );
                    if (typeof user.preferencesCulinaires === "string") {
                      setEditedPreferences(
                        user.preferencesCulinaires.split(",")
                      );
                    } else if (Array.isArray(user.preferencesCulinaires)) {
                      setEditedPreferences(user.preferencesCulinaires);
                    } else {
                      setEditedPreferences([]); // fallback if null or undefined
                    }
                    setEditedLanguage(user.langue || "");
                    setEditedBio(user.bio || "");
                    setEditedNationalite(user.nationalite || "");
                  }}
                >
                  <Pencil size={18} />
                  Customize my profile
                </button>
              </div>
            </div>
          </div>

          {showUploader && (
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="mt-6 p-6 border-2 border-dashed border-[#A12312] rounded-lg text-center cursor-pointer relative flex flex-col items-center justify-center gap-2"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
                disabled={uploading}
              />
              <UploadCloud size={48} className="text-[#A12312]" />
              <p className="text-[#A12312] font-semibold">
                {uploading
                  ? "Téléchargement en cours..."
                  : "Glisse et dépose une image ici, ou clique pour choisir un fichier"}
              </p>
              {error && <p className="text-red-600 mt-2">{error}</p>}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUploader(false);
                  setPreviewSrc(null);
                  setError(null);
                }}
                className="absolute top-2 right-2 text-[#A12312] hover:text-[#D65A31]"
                title="Fermer"
                disabled={uploading}
              >
                <X size={20} />
              </button>
            </div>
          )}

          {isEditing && (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Family Name
                </label>
                <input
                  type="text"
                  value={editedFName}
                  onChange={(e) => setEditedFName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Of Birth
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between px-3 py-2 rounded-md border text-left font-normal text-gray-800"
                    >
                      {editedDateofBirth
                        ? format(new Date(editedDateofBirth), "dd MMMM yyyy", {
                            locale: fr,
                          })
                        : "Choisissez une date"}

                      <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto bg-white p-0 shadow-lg rounded-md border"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={
                        editedDateofBirth
                          ? new Date(editedDateofBirth)
                          : undefined
                      }
                      onSelect={(date) => {
                        if (date)
                          setEditedDateofBirth(
                            date.toISOString().split("T")[0]
                          );
                      }}
                      captionLayout="dropdown"
                      fromYear={1950}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country{" "}
                </label>
                <input
                  type="text"
                  value={editedNationalite}
                  onChange={(e) => setEditedNationalite(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <CountrySelect
                  value={editedNationalite}
                  onChange={setEditedNationalite}
                />
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Culinary Prefecenses
                </label> */}
                {/* <input
                  type="text"
                  value={editedPreferences}
                  onChange={(e) => setEditedPreferences(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                /> */}
                <PreferencesInput
                  preferences={editedPreferences}
                  onChange={setEditedPreferences}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Langue
                </label>
                <input
                  type="text"
                  value={editedLanguage}
                  onChange={(e) => setEditedLanguage(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  value={editedLocalisation}
                  onChange={(e) => setEditedLocalisation(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biographie
                </label>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-[#A12312] text-white hover:bg-[#D65A31]"
                  disabled={saving}
                >
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 border-t pt-6 space-y-2 text-sm text-gray-700">
            <p>
              📅 <span className="font-medium">Date of Birth :</span>{" "}
              {user.dateNaissance
                ? new Date(user.dateNaissance).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Non renseignées"}
            </p>

            <p>
              🍽️ <span className="font-medium">Culinary preferences:</span>{" "}
              {user.preferencesCulinaires?.join(", ") || "Non renseignées"}
            </p>
            <p>
              🗺️ <span className="font-medium">Last activity:</span>{" "}
              {user.lastActivity || "Pas encore d’activité"}
            </p>
            <p>
              🌍 <span className="font-medium">Language :</span>{" "}
              {user.langue || "Français"}
            </p>
            <p>
              📝 <span className="font-medium">Bio :</span>{" "}
              {user.bio || "Aucune biographie pour l’instant."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
