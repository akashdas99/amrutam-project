import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function Input({
  label,
  error,
  required,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1 grow">
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
        <input
          id={inputId}
          className={`w-full px-4 py-3 border-2 border-light-gray rounded-md focus:outline-none text-xs ${
            error ? "border-danger" : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
}
