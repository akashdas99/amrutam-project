"use client";
import StepRenderer from "@/components/common/stepRenderer";
import Breadcrumb from "@/components/ui/breadcrumb";
import BtnGroup from "@/components/ui/btnGroup";
import Stepper from "@/components/ui/stepper";
import { useRef } from "react";

export default function IngredientsAdd() {
  const ref = useRef<{ submitForm: () => void }>(null);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Ingredient", href: "/ingredients" },
          { label: "Add Ingredient" },
        ]}
      />
      <Stepper />
      <form
        onSubmit={(e) => {
          e?.preventDefault();
          console.log("subt");
          ref?.current?.submitForm();
        }}
      >
        <StepRenderer ref={ref} />
        <BtnGroup />
      </form>
    </>
  );
}
