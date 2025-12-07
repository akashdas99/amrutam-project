"use client";
import ImageUpload from "@/components/ui/imageUpload";
import Input from "@/components/ui/input";
import { errorMessages } from "@/lib/contants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { RefObject, useImperativeHandle } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const benefitsSchema = z.object({
  whyToUse: z
    .array(
      z.object({
        description: z.string().min(10, errorMessages.DESCRIPTION_MIN_LENGTH),
      })
    )
    .min(1, "At least one reason is required"),
  prakritiImpact: z.string().min(10, errorMessages.DESCRIPTION_MIN_LENGTH),
  benefits: z
    .array(
      z.object({
        image: z.string().min(1, errorMessages.IMAGE_REQUIRED),
        description: z.string().min(10, errorMessages.DESCRIPTION_MIN_LENGTH),
      })
    )
    .min(1, "At least one benefit is required"),
});

export type BenefitsFormData = z.infer<typeof benefitsSchema>;

interface BenefitsProps {
  onSubmit: (data: BenefitsFormData) => void;
  ref: RefObject<{ submitForm: () => void } | null>;
  initialData?: Partial<BenefitsFormData>;
}

export default function Benefits({
  onSubmit,
  ref,
  initialData,
}: BenefitsProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BenefitsFormData>({
    resolver: zodResolver(benefitsSchema),
    defaultValues: initialData || {
      whyToUse: [{ description: "" }],
      prakritiImpact: "",
      benefits: [{ image: "", description: "" }],
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
      submitForm: () => {
        handleSubmit(onSubmit)();
      },
    }),
    []
  );

  return (
    <form className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
      <h1 className="text-[18px] font-semibold">Why To use?</h1>

      <div className="flex flex-col gap-3">
        {whyToUseFields.map((field, index) => (
          <div key={field.id} className="flex gap-5">
            <Input
              required
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
      {/* <Input
        label="Prakriti Impact"
        required
        {...register("prakritiImpact")}
        error={errors.prakritiImpact?.message}
      /> */}
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
    </form>
  );
}
