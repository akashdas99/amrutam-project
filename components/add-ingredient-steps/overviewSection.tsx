import { ReactNode } from "react";
import Button from "../ui/button";
import Image from "next/image";
import StepBackButton from "../ui/stepBackButton";

interface OverviewSectionProps {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
  step: number;
}

export function OverviewSection({
  title,
  children,
  withDivider = false,
  step,
}: OverviewSectionProps) {
  return (
    <>
      <section>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <StepBackButton step={step} />
        </div>
        {children}
      </section>
      {withDivider && <div className="border-t border-light-gray"></div>}
    </>
  );
}
