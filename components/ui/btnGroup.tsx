import { useStepStoreSelector } from "@/store/stepStore";
import Button from "./button";

export default function BtnGroup() {
  const { step } = useStepStoreSelector("step");

  return (
    <div className="flex justify-center gap-4 mt-5">
      <Button type="submit">{step < 5 ? "Save" : "Submit"}</Button>
      {step < 5 && (
        <Button variant={"ghost"} type="submit">
          Next
        </Button>
      )}
    </div>
  );
}
