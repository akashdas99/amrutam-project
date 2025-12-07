"use client";
import GeneralInfo from "@/components/add-ingredient-steps/generalInfo";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import { RefObject, useRef } from "react";

export default function IngredientsAdd() {
  const generalInfoRef = useRef<{ submitForm: () => void }>(null);

  const handleSave = () => {
    generalInfoRef?.current?.submitForm();
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Ingredient", href: "/ingredients" },
          { label: "Add Ingredient" },
        ]}
      />
      <GeneralInfo
        ref={generalInfoRef}
        onSubmit={(data) => {
          console.log("Ingredient data:", data);
          // Handle save logic here
        }}
      />
      <div className="flex justify-center gap-4">
        <Button onClick={handleSave}>Save</Button>
        <Button variant={"ghost"}>Next</Button>
      </div>
    </div>
  );
}
