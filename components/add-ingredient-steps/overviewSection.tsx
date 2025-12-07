import { ReactNode } from "react";
import Button from "../ui/button";
import Image from "next/image";

interface OverviewSectionProps {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
  stepBack: () => void;
}

export function OverviewSection({
  title,
  children,
  withDivider = false,
  stepBack,
}: OverviewSectionProps) {
  return (
    <>
      <section>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <Button
            type="button"
            variant="ghost"
            outlined
            className="w-9 h-9 bg-light-gray/50 border-0 rounded-lg"
            onClick={stepBack}
          >
            <Image
              src={"/images/step-back.png"}
              alt=""
              width={20}
              height={16}
              className="mx-auto"
            />
          </Button>
        </div>
        {children}
      </section>
      {withDivider && <div className="border-t border-light-gray"></div>}
    </>
  );
}
