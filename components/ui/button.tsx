import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "mt-5 rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none w-[188px] h-[44px]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90 ",
        ghost: "bg-foreground hover:bg-gray/10 text-primary",
      },
    },
    defaultVariants: {
      variant: "primary",
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
  ...props
}: ButtonProps) {
  return (
    <button
      role="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
