"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyUserWithMagicLink } from "@/lib/api";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setError("Lien invalide");
        setLoading(false);
        return;
      }

      try {
        const { accessToken, user } = await verifyUserWithMagicLink(token, email);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "tourist") {
          router.replace("/");
        } else {
          router.replace("/admin");
        }
      } catch (err: any) {
        setError(err.message || "Échec de la vérification.");
        setLoading(false);
      }
    };

    verify();
  }, [searchParams, router]);

  if (loading) return <p className="p-4 text-center">Vérification en cours...</p>;
  if (error) return <p className="p-4 text-red-600 text-center">{error}</p>;

  return null;
}
