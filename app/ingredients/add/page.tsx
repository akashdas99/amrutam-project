"use client";
import Benefits from "@/components/add-ingredient-steps/benefits";
import GeneralInfo from "@/components/add-ingredient-steps/generalInfo";
import Others from "@/components/add-ingredient-steps/others";
import Overview from "@/components/add-ingredient-steps/overview";
import Properties from "@/components/add-ingredient-steps/properties";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Stepper from "@/components/ui/stepper";
import { useStepStoreSelector } from "@/store/stepStore";
import { useRef } from "react";

export default function IngredientsAdd() {
  const ref = useRef<{ submitForm: () => void }>(null);
  const { step } = useStepStoreSelector("step");

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GeneralInfo ref={ref} />;
      case 2:
        return <Benefits ref={ref} />;
      case 3:
        return <Properties ref={ref} />;
      case 4:
        return <Others ref={ref} />;
      case 5:
        return <Overview ref={ref} />;
      default:
        return <GeneralInfo ref={ref} />;
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Ingredient", href: "/ingredients" },
          { label: "Add Ingredient" },
        ]}
      />
      <Stepper />
      {renderStep()}
      <div className="flex justify-center gap-4 mt-5">
        <Button onClick={() => ref?.current?.submitForm()}>
          {step < 5 ? "Save" : "Submit"}
        </Button>
        {step < 5 && (
          <Button
            variant={"ghost"}
            type="submit"
            onClick={() => {
              ref?.current?.submitForm();
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
