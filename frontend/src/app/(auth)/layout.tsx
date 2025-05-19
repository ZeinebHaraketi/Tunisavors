import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen">
      {/* Formulaire à gauche */}
      <section className="flex w-full md:w-1/2 flex-col items-center justify-start bg-[#fff4f0] p-6 pt-12">
        {/* Logo centré en haut */}
        <div className="flex justify-center mb-32">
          <Image src="/logo.png" alt="TuniSavors Logo" width={120} height={120} />
        </div>

        {/* Contenu du formulaire */}
        <div className="w-full max-w-md space-y-6">{children}</div>
      </section>

      {/* Illustration à droite */}
      <section className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/auth-illustration.png"
          alt="Illustration de connexion"
          fill
          className="object-cover"
          priority
        />
      </section>
    </main>
  );
}
