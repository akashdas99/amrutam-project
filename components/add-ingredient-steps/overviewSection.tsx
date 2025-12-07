import { ReactNode } from "react";

interface OverviewSectionProps {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
}

export function OverviewSection({
  title,
  children,
  withDivider = false,
}: OverviewSectionProps) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
      </section>
      {withDivider && <div className="border-t border-light-gray"></div>}
    </>
  );
}
