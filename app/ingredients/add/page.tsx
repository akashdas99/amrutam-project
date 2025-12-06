import Breadcrumb from "@/components/ui/breadcrumb";

export default function IngredientsAdd() {
  return (
    <div className="">
      <Breadcrumb
        items={[
          { label: "Ingredient", href: "/ingredients" },
          { label: "Add Ingredient" },
        ]}
      />
      <div>Add Ingredient Form</div>
    </div>
  );
}
