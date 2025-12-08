import { useStepStoreSelector } from "@/store/stepStore";
import { RefObject, useCallback } from "react";
import Benefits from "../add-ingredient-steps/benefits";
import GeneralInfo from "../add-ingredient-steps/generalInfo";
import Others from "../add-ingredient-steps/others";
import Overview from "../add-ingredient-steps/overview";
import Properties from "../add-ingredient-steps/properties";

export default function StepRenderer({
  ref,
}: {
  ref: RefObject<{ submitForm: () => void } | null>;
}) {
  const { step } = useStepStoreSelector("step");

  const renderStep = useCallback((currStep: number) => {
    switch (currStep) {
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
  }, []);

  return <>{renderStep(step)}</>;
}
