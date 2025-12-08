interface OverviewListProps {
  items: Array<{ description: string }> | undefined;
}

export function OverviewList({ items }: OverviewListProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
      {items
        ?.filter(({ description }) => description)
        ?.map((item, index) => (
          <li key={index}>{item.description}</li>
        ))}
    </ul>
  );
}
