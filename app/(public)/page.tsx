"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function HomePage() {
  const [logo, setLogo] = useState<string>("/logos/mprcs.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDODV = true;

  const handleLogoClick = () => {
    if (isDODV) fileInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogo(URL.createObjectURL(file));
  };

  return (
    <main className="flex flex-col items-center px-6 py-16 text-center">
      {/* LOGO */}
      <div
        onClick={handleLogoClick}
        className={`
          relative w-[180px] h-[180px]
          border-2 border-dashed border-gray-400
          rounded-xl bg-gray-50
          overflow-hidden
          flex items-center justify-center
          mb-8
          ${isDODV ? "cursor-pointer hover:bg-gray-100" : ""}
        `}
      >
        <Image
          src={logo}
          alt="Logo MPR & CS"
          fill
          className="object-contain"
          sizes="180px"
          priority
        />
      </div>

      {isDODV && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleLogoChange}
          hidden
        />
      )}

      {/* TEXTE */}
      <h1 className="text-2xl font-semibold leading-relaxed">
        Bienvenue sur la plateforme officielle
        <br />
        du
        <br />
        Ministère Pensée Renouvelée et Club des Semeurs
        <br />
        <span className="font-bold">« MPR & CS »</span>
      </h1>

      <p className="mt-6 max-w-3xl text-gray-700 leading-relaxed">
        {/* texte inchangé */}
        Nous sommes honorés de vous accueillir dans cet espace consacré à la
        promotion du Royaume des Cieux, à l’édification spirituelle et à
        l’engagement au service de la vision que Dieu nous a confiée.
        <br /><br />
        Ici, chaque visite est une invitation à découvrir, grandir, servir et
        impacter.
        <br /><br />
        Que vous soyez en quête de sens, désireux de vous engager dans un
        département, ou animé par le désir de soutenir l’œuvre de Dieu, cette
        plateforme est un point de rencontre entre l’appel divin et l’action
        concrète.
        <br /><br />
        MPR & CS œuvre pour former des hommes et des femmes transformés,
        enracinés dans la Parole, engagés dans la prière, la mission et
        l’excellence, tout en manifestant l’amour de Christ envers les
        prochains.
        <br /><br />
        Nous prions que votre passage ici soit une source de révélation, de paix
        et d’orientation.
        <br /><br />
        Bienvenue dans une communauté appelée à briller pour la gloire de Dieu.
      </p>
    </main>
  );
}