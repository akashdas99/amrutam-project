import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-foreground w-full flex fixed top-0">
      <Image src="/images/logo.svg" alt="Amrutam" width={67} height={67} />
      <div className="flex items-center justify-between grow">
        <Image
          src="/images/amrutam-logo.png"
          alt="Amrutam"
          width={164}
          height={46}
        />
        <div className="flex items-center gap-3 mr-[66px] text-right">
          <div>
            <div className="text-black font-semibold text-base">John Doe</div>
            <div className="text-gray font-normal text-[12px]">Admin</div>
          </div>
          <Image
            src="/images/admin-avatar.png"
            alt="Admin Avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}
