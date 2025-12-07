"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, unknown, T> | undefined;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export default function Select<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Select",
  label,
  required,
  error,
}: SelectProps<T>) {
  const id = React.useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div className="flex flex-col gap-1">
          <div className="relative">
            {label && (
              <label
                htmlFor={id}
                className="absolute -top-2 left-3 text-sm font-medium text-black bg-foreground px-1"
              >
                {label}
                {required && <span className="text-danger">*</span>}
              </label>
            )}
            <SelectPrimitive.Root value={value} onValueChange={onChange}>
              <SelectPrimitive.Trigger
                ref={ref}
                id={id}
                onBlur={onBlur}
                className={
                  "flex items-center justify-between w-full px-4 py-3 rounded-md border-2 text-xs focus:outline-none " +
                  (error
                    ? "border-danger focus:border-danger"
                    : "border-light-gray focus:border-primary")
                }
              >
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon>
                  <ChevronDown className="w-4 h-4.5 text-gray-500" />
                </SelectPrimitive.Icon>
              </SelectPrimitive.Trigger>

              <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                  className="overflow-hidden bg-foreground rounded-md border-2 border-light-gray shadow-lg"
                  position="popper"
                  sideOffset={5}
                  align="start"
                  style={{ width: "var(--radix-select-trigger-width)" }}
                >
                  <SelectPrimitive.Viewport className="p-1">
                    {options.map((option) => (
                      <SelectPrimitive.Item
                        key={option.value}
                        value={option.value}
                        className="relative flex items-center px-4 py-2 text-xs rounded-md cursor-pointer select-none hover:bg-primary/10 focus:bg-primary/10 focus:outline-none data-[state=checked]:bg-primary/20 data-[state=checked]:font-medium"
                      >
                        <SelectPrimitive.ItemText>
                          {option.label}
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
              </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
          </div>
          {error && <span className="text-xs text-danger">{error}</span>}
        </div>
      )}
    />
  );
}
