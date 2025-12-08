"use client";
import ImageUpload from "@/components/ui/imageUpload";
import Input from "@/components/ui/input";
import { ERROR_MESSAGE } from "@/lib/contants";
import { useIngredientStoreSelector } from "@/store/ingredientStore";
import { useStepStoreSelector } from "@/store/stepStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const generalInfoSchema = z.object({
  ingredientName: z.string().min(1, ERROR_MESSAGE.INGREDIENT_NAME_REQUIRED),
  scientificName: z.string().min(1, ERROR_MESSAGE.SCIENTIFIC_NAME_REQUIRED),
  sanskritName: z.string().min(1, ERROR_MESSAGE.SANSKRIT_NAME_REQUIRED),
  description: z.string().min(10, ERROR_MESSAGE.DESCRIPTION_MIN_LENGTH),
  image: z.string().min(1, ERROR_MESSAGE.IMAGE_REQUIRED),
});

export type GeneralInfoFormData = z.infer<typeof generalInfoSchema>;

interface GeneralInfoProps {
  ref: RefObject<{ submitForm: () => void } | null>;
}

export default function GeneralInfo({ ref }: GeneralInfoProps) {
  const { ingredient, updateIngredient } = useIngredientStoreSelector(
    "ingredient",
    "updateIngredient"
  );
  const { nextStep } = useStepStoreSelector("nextStep");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GeneralInfoFormData>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      ingredientName: ingredient?.ingredientName,
      scientificName: ingredient?.scientificName,
      sanskritName: ingredient?.sanskritName,
      description: ingredient?.description,
      image: ingredient?.image,
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      submitForm: handleSubmit((data) => {
        updateIngredient(data);
        nextStep();
      }),
    }),
    []
  );

  return (
    <div className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
      <h1 className="text-[18px] font-semibold">General Information</h1>
      <div className="flex gap-5">
        <Input
          label="Ingredient Name"
          required
          {...register("ingredientName")}
          error={errors.ingredientName?.message}
        />
        <Input
          label="Scientific Name"
          required
          {...register("scientificName")}
          error={errors.scientificName?.message}
        />
        <Input
          label="Sanskrit Name"
          required
          {...register("sanskritName")}
          error={errors.sanskritName?.message}
        />
      </div>
      <Input
        label="Description"
        required
        {...register("description")}
        error={errors.description?.message}
      />
      <ImageUpload
        width={220}
        height={220}
        name="image"
        control={control}
        error={errors?.image?.message}
      />
    </div>
  );
}
