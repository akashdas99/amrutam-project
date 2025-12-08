"use client";
import ImageUpload from "@/components/ui/imageUpload";
import Input from "@/components/ui/input";
import { ERROR_MESSAGE, IMPACT_OPTIONS } from "@/lib/contants";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { RefObject, useImperativeHandle } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Select from "../ui/select";
import { useIngredientStoreSelector } from "@/store/ingredientStore";
import { useStepStoreSelector } from "@/store/stepStore";

const benefitsSchema = z.object({
  whyToUse: z.array(
    z.object({
      description: z.string(),
    })
  ),
  prakritiImpact: z.object({
    vata: z.string().min(1, ERROR_MESSAGE.PRAKRITI_IMPACT_REQUIRED),
    vataReason: z.string(),
    kapha: z.string().min(1, ERROR_MESSAGE.PRAKRITI_IMPACT_REQUIRED),
    kaphaReason: z.string(),
    pitta: z.string().min(1, ERROR_MESSAGE.PRAKRITI_IMPACT_REQUIRED),
    pittaReason: z.string(),
  }),
  benefits: z.array(
    z.object({
      image: z.string(),
      description: z.string(),
    })
  ),
});

export type BenefitsFormData = z.infer<typeof benefitsSchema>;

interface BenefitsProps {
  ref: RefObject<{ submitForm: () => void } | null>;
}

export default function Benefits({ ref }: BenefitsProps) {
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
  } = useForm<BenefitsFormData>({
    resolver: zodResolver(benefitsSchema),
    defaultValues: {
      whyToUse: ingredient?.whyToUse,
      prakritiImpact: ingredient?.prakritiImpact,
      benefits: ingredient?.benefits,
    },
  });

  const {
    fields: whyToUseFields,
    append: whyToUseAppend,
    remove: whyToUseRemove,
  } = useFieldArray({
    control,
    name: "whyToUse",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
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
      <h1 className="text-[18px] font-semibold">Why To use?</h1>

      <div className="flex flex-col gap-3">
        {whyToUseFields.map((field, index) => (
          <div key={field.id} className="flex gap-5">
            <Input
              {...register(`whyToUse.${index}.description`)}
              error={errors.whyToUse?.[index]?.description?.message}
            />
            {whyToUseFields.length > 0 && (
              <button
                type="button"
                onClick={() => whyToUseRemove(index)}
                title="Remove"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="self-start text-primary font-semibold cursor-pointer"
          onClick={() => whyToUseAppend({ description: "" })}
        >
          Add Another items
        </button>
      </div>
      <h2 className="text-[18px] font-semibold">Prakriti Impact</h2>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <Select
            name="prakritiImpact.vata"
            control={control}
            options={IMPACT_OPTIONS.map((option) => ({
              value: option,
              label: option,
            }))}
            label="Vata"
            required
            error={errors.prakritiImpact?.vata?.message}
          />
          <Select
            name="prakritiImpact.pitta"
            control={control}
            options={IMPACT_OPTIONS.map((option) => ({
              value: option,
              label: option,
            }))}
            label="Pitta"
            required
            error={errors.prakritiImpact?.pitta?.message}
          />
          <Select
            name="prakritiImpact.kapha"
            control={control}
            options={IMPACT_OPTIONS.map((option) => ({
              value: option,
              label: option,
            }))}
            label="Kapha"
            required
            error={errors.prakritiImpact?.kapha?.message}
          />
        </div>

        <div className="flex gap-4 items-start">
          <Input
            label="Vata Reason"
            {...register("prakritiImpact.vataReason")}
            error={errors.prakritiImpact?.vataReason?.message}
          />
          <Input
            label="Pitta Reason"
            {...register("prakritiImpact.pittaReason")}
            error={errors.prakritiImpact?.pittaReason?.message}
          />
          <Input
            label="Kapha Reason"
            {...register("prakritiImpact.kaphaReason")}
            error={errors.prakritiImpact?.kaphaReason?.message}
          />
        </div>
      </div>

      <h2 className="text-[18px] font-semibold">Benefits</h2>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            <ImageUpload
              width={136}
              height={38}
              name={`benefits.${index}.image`}
              control={control}
              error={errors.benefits?.[index]?.image?.message}
              type="icon"
            >
              <Image
                src={"/images/smiley.png"}
                alt=""
                width={24}
                height={24}
                className="mr-2 object-contain"
              />
              <span className="font-medium">Add Emoji</span>
            </ImageUpload>
            <div className="flex-1">
              <Input
                required
                {...register(`benefits.${index}.description`)}
                error={errors.benefits?.[index]?.description?.message}
                className="py-2.5"
              />
            </div>

            <button type="button" onClick={() => remove(index)} title="Remove">
              <X className="w-6 h-6 text-primary" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="self-start text-primary font-semibold cursor-pointer"
          onClick={() => append({ image: "", description: "" })}
        >
          Add Another items
        </button>
      </div>
    </div>
  );
}
