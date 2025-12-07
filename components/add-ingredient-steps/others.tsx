"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { ERROR_MESSAGE, PLANT_PARTS_OPTIONS } from "@/lib/contants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { RefObject, useImperativeHandle } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export const plantPartSchema = z.object({
  plantPart: z.string().min(1, ERROR_MESSAGE.PLANT_PART_REQUIRED),
  description: z.string().min(1, ERROR_MESSAGE.DESCRIPTION_REQUIRED),
});

export type PlantPartData = z.infer<typeof plantPartSchema>;

const othersSchema = z.object({
  plantParts: z
    .array(plantPartSchema)
    .min(1, "At least one plant part is required"),
  bestCombinedWith: z
    .string()
    .min(1, ERROR_MESSAGE.BEST_COMBINED_WITH_REQUIRED),
  geographicalLocations: z
    .string()
    .min(1, ERROR_MESSAGE.GEOGRAPHICAL_LOCATIONS_REQUIRED),
});

export type OthersFormData = z.infer<typeof othersSchema>;

interface OthersProps {
  onSubmit: (data: OthersFormData) => void;
  ref: RefObject<{ submitForm: () => void } | null>;
  initialData?: Partial<OthersFormData>;
}

export default function Others({ onSubmit, ref, initialData }: OthersProps) {
  const {
    register: plantPartRegister,
    handleSubmit: plantPartHandleSubmit,
    control: plantPartControl,
    reset: plantPartReset,
    formState: { errors: plantPartErrors },
  } = useForm<PlantPartData>({
    resolver: zodResolver(plantPartSchema),
    defaultValues: {
      plantPart: "",
      description: "",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<OthersFormData>({
    resolver: zodResolver(othersSchema),
    defaultValues: initialData || {
      plantParts: [],
      bestCombinedWith: "",
      geographicalLocations: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plantParts",
  });

  useImperativeHandle(
    ref,
    () => ({
      submitForm: () => {
        handleSubmit(onSubmit)();
      },
    }),
    []
  );

  const handleAdd = (data: PlantPartData) => {
    append(data);
    plantPartReset();
  };

  return (
    <form className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
      <h1 className="text-[18px] font-semibold">Plant Parts and Its Purpose</h1>

      <div className="flex gap-4 items-start">
        <Select
          name="plantPart"
          control={plantPartControl}
          options={PLANT_PARTS_OPTIONS.map((option) => ({
            value: option,
            label: option,
          }))}
          label="Plant Part"
          required
          error={errors?.plantParts?.message}
        />
        <Input
          label="Description"
          required
          {...plantPartRegister("description")}
          error={plantPartErrors?.description?.message}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={plantPartHandleSubmit(handleAdd)}
          size={"sm"}
          className="flex items-center justify-center gap-2"
        >
          <Plus /> Add
        </Button>
        <Button
          type="button"
          variant="ghost"
          outlined
          className="w-10.5"
          onClick={() => remove()}
        >
          <X className="w-5 h-5 mx-auto" />
        </Button>
      </div>

      {fields.length > 0 && (
        <div className="flex flex-col gap-2.5 p-4 border-2 border-light-gray rounded-xl">
          <div className="flex gap-2">
            <h2 className="font-medium flex-1">Type</h2>
            <h2 className="font-medium flex-3">Description</h2>
          </div>

          <div className="border-t border-light-gray"></div>
          {fields.map((field, index) => (
            <>
              <div key={`${field.id}-type`} className="flex gap-2">
                <p className="text-sm flex-1 text-gray">
                  {getValues(`plantParts.${index}.plantPart`)}
                </p>
                <p
                  key={`${field.id}-desc`}
                  className="text-sm flex-3 text-gray"
                >
                  {getValues(`plantParts.${index}.description`)}
                </p>
              </div>
            </>
          ))}
        </div>
      )}

      <Input
        label="Best Combined With"
        required
        {...register("bestCombinedWith")}
        error={errors.bestCombinedWith?.message}
      />

      <Input
        label="Geographical Locations"
        required
        {...register("geographicalLocations")}
        error={errors.geographicalLocations?.message}
      />
    </form>
  );
}
