"use client";
import Benefits from "@/components/add-ingredient-steps/benefits";
import GeneralInfo from "@/components/add-ingredient-steps/generalInfo";
import Others from "@/components/add-ingredient-steps/others";
import Overview, {
  OverviewFormData,
} from "@/components/add-ingredient-steps/overview";
import Properties from "@/components/add-ingredient-steps/properties";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Stepper from "@/components/ui/stepper";
import { useIngredientStoreSelector } from "@/store/ingredientStore";
import { useCallback, useMemo, useRef, useState } from "react";

export default function IngredientsAdd() {
  const ref = useRef<{ submitForm: () => void }>(null);
  const [step, setStep] = useState(4);

  const { updateIngredient } = useIngredientStoreSelector("updateIngredient");
  const onSubmit = useCallback(
    (data: Partial<OverviewFormData>) => {
      updateIngredient(data);
      setStep((prev) => prev + 1);
    },
    [updateIngredient, setStep]
  );
  const steps = useMemo(
    () => [
      <GeneralInfo ref={ref} onSubmit={onSubmit} />,
      <Benefits ref={ref} onSubmit={onSubmit} />,
      <Properties ref={ref} onSubmit={onSubmit} />,
      <Others ref={ref} onSubmit={onSubmit} />,
      <Overview
        ref={ref}
        onSubmit={() => console.log("submitted")}
        stepBack={(i) => setStep(i)}
      />,
    ],
    [onSubmit, setStep]
  );
  console.count("parent");
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Ingredient", href: "/ingredients" },
          { label: "Add Ingredient" },
        ]}
      />
      <Stepper currentStep={step + 1} />
      {steps[step]}
      <div className="flex justify-center gap-4 mt-5">
        <Button onClick={() => ref?.current?.submitForm()}>
          {step < 4 ? "Save" : "Submit"}
        </Button>
        {step < 4 && (
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
