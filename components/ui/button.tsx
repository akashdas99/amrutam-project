import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90 ",
        ghost: "bg-foreground hover:bg-gray/10 text-primary",
      },
      size: {
        lg: "w-[188px] h-[44px]",
        sm: "w-[100px] h-[42px]",
      },
      outlined: {
        true: "border-1 border-light-gray",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function Button({
  className,
  variant,
  children,
  size,
  outlined,
  ...props
}: ButtonProps) {
  return (
    <button
      role="button"
      className={cn(buttonVariants({ variant, size, outlined, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
