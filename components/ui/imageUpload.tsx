"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ImageUploadProps<T extends FieldValues> {
  type?: "image" | "icon";
  height: number;
  width: number;
  name: Path<T>;
  control: Control<T, unknown, T> | undefined;
  error?: string;
  children?: React.ReactNode;
}

export default function ImageUpload<T extends FieldValues>({
  type = "image",
  control,
  height,
  width,
  name,
  error,
  children,
}: ImageUploadProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div
          className={
            "relative border border-dashed overflow-hidden flex items-center justify-center cursor-pointer" +
            (error
              ? " bg-danger/10 border-danger"
              : " bg-[#EAF2EA] border-[#9DB29D]") +
            (type === "icon" ? " rounded-[8px]" : " rounded-2xl")
          }
          style={{
            height,
            width,
          }}
        >
          {value ? (
            <>
              <img src={value} alt="Upload preview" />
              <button
                onClick={() => onChange("")}
                className="absolute top-2 right-2 bg-[#b0c1b1] text-[#3A643C] rounded-full w-5 h-5 flex items-center justify-center z-2 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            children || (
              <div className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={"/images/image-upload-icon.svg"}
                  alt="img-upload"
                  width={24}
                  height={24}
                />
                <span className="text-xs font-medium">Upload Image</span>
              </div>
            )
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
            className="opacity-0 absolute h-full w-full cursor-pointer text-[0px]"
          />
        </div>
      )}
    />
  );
}
