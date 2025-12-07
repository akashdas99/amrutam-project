"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-primary mb-6 gap-3 ">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {index > 0 && <ChevronRight strokeWidth={1} />}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
