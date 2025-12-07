"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ImageUploadProps<T extends FieldValues> {
  height: number;
  width: number;
  name: Path<T>;
  control: Control<T, unknown, T> | undefined;
}

export default function ImageUpload<T extends FieldValues>({
  control,
  height,
  width,
  name,
}: ImageUploadProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div
          className="relative border border-dashed overflow-hidden border-[#9DB29D] rounded-2xl flex items-center justify-center bg-[#EAF2EA]"
          style={{
            height,
            width,
          }}
        >
          {value ? (
            <>
              <Image
                src={value}
                alt="Upload preview"
                fill
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => onChange("")}
                className="absolute top-2 right-2 bg-[#b0c1b1] text-[#3A643C] rounded-full w-5 h-5 flex items-center justify-center z-2 cursor-pointer"
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
          <input
            ref={ref}
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  onChange?.(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            onBlur={onBlur}
            className="opacity-0 absolute h-full w-full cursor-pointer"
          />
        </div>
      )}
    />
  );
}
