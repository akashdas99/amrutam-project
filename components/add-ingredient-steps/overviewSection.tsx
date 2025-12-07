import { ReactNode } from "react";
import Button from "../ui/button";
import Image from "next/image";
import StepBackButton from "../ui/stepBackButton";
import IngredientDropdownMenu from "../ui/dropdownMenu";

interface OverviewSectionProps {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
  step: number;
  showMenu?: boolean;
  isActive?: boolean;
  onToggleStatus?: () => void;
  onEdit?: () => void;
  sectionIndex?: number;
}

export function OverviewSection({
  title,
  children,
  withDivider = false,
  step,
  showMenu = false,
  isActive = false,
  onToggleStatus,
  onEdit,
}: OverviewSectionProps) {
  return (
    <>
      <section>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            {showMenu && (
              <Image
                src={
                  isActive ? "/images/tick.png" : "/images/inactive.png"
                }
                alt="status"
                width={24}
                height={24}
              />
            )}
          </div>
          {showMenu ? (
            <IngredientDropdownMenu
              isActive={isActive}
              onToggleStatus={onToggleStatus || (() => {})}
              onEdit={onEdit || (() => {})}
            />
          ) : (
            <StepBackButton step={step} />
          )}
        </div>
        {children}
      </section>
      {withDivider && <div className="border-t border-light-gray"></div>}
    </>
  );
}
