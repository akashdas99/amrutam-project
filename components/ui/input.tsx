import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  required?: boolean;
  showSearchIcon?: boolean;
}

export default function Input({
  label,
  error,
  required,
  className = "",
  id,
  showSearchIcon = false,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1 flex-1">
      <div className="relative">
        {label && (
          <label
            htmlFor={inputId}
            className="absolute -top-2 left-3 text-sm font-medium text-black bg-foreground px-1"
          >
            {label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        {showSearchIcon && (
          <Image
            src={"/images/search.svg"}
            alt="search"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            width={18.5}
            height={18.5}
          />
        )}
        <input
          id={inputId}
          className={cn(
            `w-full py-3 border-2 border-light-gray rounded-md focus:outline-none text-xs`,
            showSearchIcon ? "pl-8 pr-4" : "px-4",
            className
          )}
          placeholder="Type here..."
          {...props}
        />
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
