"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";

interface DropdownMenuProps {
  isActive: boolean;
  onEdit: () => void;
  onToggleStatus: () => void;
}

export default function IngredientDropdownMenu({
  isActive,
  onEdit,
  onToggleStatus,
}: DropdownMenuProps) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray/10 focus:outline-none"
          aria-label="Options"
        >
          <EllipsisVertical className="w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="text-center min-w-[110px] bg-foreground rounded-lg shadow-lg border border-light-gray p-1 text-xs"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            className="flex justify-center items-center gap-3 px-4 py-2 text-primary outline-none cursor-pointer rounded hover:bg-gray/10 focus:bg-gray/10"
            onClick={onEdit}
          >
            Edit
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-light-gray my-1" />

          <DropdownMenu.Item
            className={
              "flex justify-center items-center gap-3 px-4 py-2 outline-none cursor-pointer rounded hover:bg-gray/10 focus:bg-gray/10" +
              (isActive ? " text-danger" : " text-primary")
            }
            onClick={onToggleStatus}
          >
            {isActive ? "Inactive" : "Active"}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
