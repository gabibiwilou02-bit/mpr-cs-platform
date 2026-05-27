"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  canUpload: boolean; // true seulement pour DODV
  initialLogo?: string;
};

export default function LogoUploader({ canUpload, initialLogo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    initialLogo || null
  );

  const handleClick = () => {
    if (!canUpload) return;
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    // 👉 plus tard :
    // envoyer vers /api/upload-logo
  };

  return (
    <div
      onClick={handleClick}
      className={`w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer
        ${canUpload ? "hover:bg-gray-100" : "cursor-not-allowed opacity-60"}
      `}
    >
      {preview ? (
        <Image
          src={preview}
          alt="Logo département"
          width={160}
          height={160}
          className="object-contain"
        />
      ) : (
        <span className="text-sm text-gray-500 text-center px-2">
          {canUpload ? "Cliquer pour téléverser le logo" : "Logo du département"}
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </div>
  );
}