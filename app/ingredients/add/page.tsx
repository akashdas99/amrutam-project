"use client";
import Benefits from "@/components/add-ingredient-steps/benefits";
import GeneralInfo from "@/components/add-ingredient-steps/generalInfo";
import Others from "@/components/add-ingredient-steps/others";
import Properties from "@/components/add-ingredient-steps/properties";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import Stepper from "@/components/ui/stepper";
import { useRef, useState } from "react";

export default function IngredientsAdd() {
  const generalInfoRef = useRef<{ submitForm: () => void }>(null);
  const [step, setStep] = useState(0);
  const handleSave = () => {
    generalInfoRef?.current?.submitForm();
  };
  const steps = [
    <GeneralInfo
      ref={generalInfoRef}
      onSubmit={(data) => {
        console.log("Ingredient data:", data);
        // Handle save logic here
      }}
    />,
    <Benefits
      ref={generalInfoRef}
      onSubmit={(data) => {
        console.log("Benefits data:", data);
        // Handle save logic here
      }}
    />,
    <Properties
      ref={generalInfoRef}
      onSubmit={(data) => {
        console.log("Benefits data:", data);
        // Handle save logic here
      }}
    />,
    <Others
      ref={generalInfoRef}
      onSubmit={(data) => {
        console.log("Benefits data:", data);
        // Handle save logic here
      }}
    />,
  ];
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
        <Button onClick={handleSave}>Save</Button>
        <Button variant={"ghost"} onClick={() => setStep((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
