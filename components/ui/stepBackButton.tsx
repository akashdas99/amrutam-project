import Image from "next/image";
import Button from "./button";
import { useStepStoreSelector } from "@/store/stepStore";

export default function StepBackButton({ step }: { step: number }) {
  const { setStep } = useStepStoreSelector("setStep");

  return (
    <Button
      type="button"
      variant="ghost"
      outlined
      className="w-9 h-9 bg-light-gray/50 border-0 rounded-lg"
      onClick={() => setStep(step)}
    >
      <Image
        src={"/images/step-back.png"}
        alt="Go back"
        width={20}
        height={16}
        className="mx-auto"
      />
    </Button>
  );
}
