"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageUploadProps {
  onChange?: (file: File | null) => void;
  defaultImage?: string;
  height: number;
  width: number;
}

export default function ImageUpload({
  onChange,
  defaultImage,
  height,
  width,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(null);
  };

  return (
    <div
      onClick={handleClick}
      className="relative border border-dashed border-[#9DB29D] rounded-2xl cursor-pointer flex items-center justify-center bg-[#EAF2EA]"
      style={{
        height,
        width,
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <>
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-[#b0c1b1] text-[#3A643C] rounded-full w-5 h-5 flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src={"/images/image-upload-icon.svg"}
            alt="img-upload"
            width={24}
            height={24}
          />
          <span className="text-xs font-medium">Upload Image</span>
        </div>
      )}
    </div>
  );
}
