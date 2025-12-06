import ImageUpload from "../ui/imageUpload";
import Input from "../ui/input";

export default function GeneralInfo() {
  return (
    <section className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
      <h1 className="text-[18px] font-semibold">General Information</h1>
      <div className="flex gap-5">
        <Input label="Ingredient Name" required />
        <Input label="Scientific Name" required />
        <Input label="Sanskrit Name" required />
      </div>
      <Input label="Description" required />
      <ImageUpload width={220} height={220} />
    </section>
  );
}
