"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  subMenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "/images/dashboard-icon.svg",
    href: "/dashboard",
  },
  {
    id: "doctors",
    label: "Doctors",
    icon: "/images/doctors-icon.svg",
    href: "/doctors",
  },
  {
    id: "patients",
    label: "Patients",
    icon: "/images/patients-icon.svg",
    href: "/patients",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: "/images/calendar-icon.svg",
    href: "/appointments",
  },
  {
    id: "specialties",
    label: "Specialties",
    icon: "/images/ingredients-icon.svg",
    href: "/specialties",
  },
  {
    id: "ingredients",
    label: "Ingredients",
    icon: "/images/ingredients-icon.svg",
    href: "/ingredients",

    subMenu: [
      {
        id: "ingredient-list",
        label: "Ingredient List",
        href: "/ingredients",
      },
      {
        id: "add-ingredients",
        label: "Add Ingredients",
        href: "/ingredients/add",
      },
    ],
  },
  {
    id: "coupons",
    label: "Coupons",
    icon: "/images/ingredients-icon.svg",
    href: "/coupons",
  },
  {
    id: "concerns",
    label: "Concerns",
    icon: "/images/calendar-icon.svg",
    href: "/concerns",
  },
  {
    id: "referral",
    label: "Referral",
    icon: "/images/calendar-icon.svg",
    href: "/referral",
  },
  {
    id: "customization",
    label: "Customization",
    icon: "/images/calendar-icon.svg",
    href: "/customization",
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: "/images/calendar-icon.svg",
    href: "/wallet",
  },
  {
    id: "refund",
    label: "Refund",
    icon: "/images/calendar-icon.svg",
    href: "/refund",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  const isSubMenuActive = (subMenu?: SubMenuItem[]) => {
    if (!subMenu) return false;
    return subMenu.some((subItem) => pathname === subItem.href);
  };

  return (
    <aside className="bg-foreground fixed top-20 w-[200px] p-2 rounded-r-xl text-xs">
      <h3 className="text-gray p-[17px]">Menu</h3>
      <nav className="text-black">
        {menuItems?.map((item) => (
          <div key={item.id}>
            <Link
              href={item.href || "#"}
              className={`px-4 py-3 flex gap-1.5 items-center cursor-pointer hover:bg-gray/10 rounded-md transition-colors ${
                isSubMenuActive(item.subMenu)
                  ? " bg-background"
                  : isActive(item.href)
                  ? " bg-background text-secondary"
                  : ""
              }`}
            >
              <Image src={item.icon} alt={item.label} width={27} height={27} />
              <span className="flex-1">{item.label}</span>
            </Link>
            {item.subMenu && (
              <>
                <div className="ml-10 mt-1">
                  {item.subMenu.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className={`p-3 text-xs cursor-pointer hover:bg-gray/10 rounded-lg flex ${
                        isActive(subItem.href)
                          ? "text-secondary bg-background"
                          : ""
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
