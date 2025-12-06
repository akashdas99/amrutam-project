import GeneralInfo from "@/components/add-ingredient-steps/generalInfo";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";

export default function IngredientsAdd() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Ingredient", href: "/ingredients" },
          { label: "Add Ingredient" },
        ]}
      />
      <GeneralInfo />
      <div className="flex justify-center gap-4">
        <Button>Save</Button>
        <Button variant={"ghost"}>Next</Button>
      </div>
    </>
  );
}
