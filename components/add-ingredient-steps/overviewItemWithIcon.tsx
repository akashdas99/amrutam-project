import Image from "next/image";

interface OverviewItemWithIconProps {
  items:
    | Array<{
        image: string;
        description: string;
      }>
    | undefined;
}

export function OverviewItemWithIcon({ items }: OverviewItemWithIconProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {item.image && (
            <Image
              src={item.image}
              alt=""
              width={35}
              height={35}
              className="w-[35px] h-[35px] object-contain"
            />
          )}
          <p className="text-xl font-medium">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
