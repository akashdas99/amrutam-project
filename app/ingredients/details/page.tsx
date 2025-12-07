import Overview from "@/components/add-ingredient-steps/overview";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function IngredientDetails() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Ingredient", href: "/ingredients" },
          { label: "Ingredient Details" },
        ]}
      />
      <Overview showMenu />
    </div>
  );
}
