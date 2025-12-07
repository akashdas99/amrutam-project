import { cn } from "@/lib/utils";
import { useStepStoreSelector } from "@/store/stepStore";
import { Check } from "lucide-react";
import React from "react";

interface StepperProps {
  totalSteps?: number;
  labels?: string[];
}

const DEFAULT_LABELS = [
  "General information",
  "Benefits",
  "Properties",
  "Other",
  "Overview",
];

export default function Stepper({
  totalSteps = 5,
  labels = DEFAULT_LABELS,
}: StepperProps) {
  const { step: currentStep } = useStepStoreSelector("step");
  return (
    <div className="flex items-center justify-between w-[70%] mx-auto mb-9.5">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center relative">
              {/* Step Circle */}
              <div
                className={cn(
                  "w-8 h-8 mx-3 rounded-full flex items-center justify-center text-sm font-semibold",
                  isCompleted
                    ? "bg-primary text-white"
                    : isActive
                    ? "bg-white border-primary border-2 text-gray"
                    : "bg-white border-gray border-2 text-gray"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  String(stepNumber).padStart(2, "0")
                )}
              </div>

              {/* Step Label */}
              <span
                className={cn(
                  "text-xs text-center whitespace-nowrap absolute -bottom-6",
                  isActive || isCompleted
                    ? "font-semibold text-primary"
                    : "text-gray-500"
                )}
              >
                {labels[index]}
              </span>
            </div>
            {stepNumber < totalSteps && (
              <div className={cn("h-0.5 w-[25%] bg-gray")} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
