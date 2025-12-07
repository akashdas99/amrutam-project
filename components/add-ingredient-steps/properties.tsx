"use client";
import ImageUpload from "@/components/ui/imageUpload";
import Input from "@/components/ui/input";
import { ERROR_MESSAGE } from "@/lib/contants";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { RefObject, useImperativeHandle } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const propertiesSchema = z.object({
  ayurvedicProperties: z.object({
    rasa: z.string().min(1, ERROR_MESSAGE.RASA_REQUIRED),
    veerya: z.string().min(1, ERROR_MESSAGE.VEERYA_REQUIRED),
    guna: z.string().min(1, ERROR_MESSAGE.GUNA_REQUIRED),
    vipaka: z.string().min(1, ERROR_MESSAGE.VIPAKA_REQUIRED),
  }),
  importantFormulations: z.array(
    z.object({
      image: z.string(),
      description: z.string(),
    })
  ),
  therapeuticUses: z.array(
    z.object({
      description: z.string(),
    })
  ),
});

export type PropertiesFormData = z.infer<typeof propertiesSchema>;

interface PropertiesProps {
  onSubmit: (data: PropertiesFormData) => void;
  ref: RefObject<{ submitForm: () => void } | null>;
  initialData?: Partial<PropertiesFormData>;
}

export default function Properties({
  onSubmit,
  ref,
  initialData,
}: PropertiesProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropertiesFormData>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: initialData || {
      therapeuticUses: [{ description: "" }],
      ayurvedicProperties: {
        rasa: "",
        veerya: "",
        guna: "",
        vipaka: "",
      },
      importantFormulations: [{ image: "", description: "" }],
    },
  });

  const {
    fields: whyToUseFields,
    append: whyToUseAppend,
    remove: whyToUseRemove,
  } = useFieldArray({
    control,
    name: "therapeuticUses",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "importantFormulations",
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
      <h1 className="text-[18px] font-semibold">Ayurvedic Properties</h1>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Rasa"
          required
          {...register("ayurvedicProperties.rasa")}
          error={errors.ayurvedicProperties?.rasa?.message}
        />
        <Input
          label="Veerya"
          required
          {...register("ayurvedicProperties.veerya")}
          error={errors.ayurvedicProperties?.veerya?.message}
        />
        <Input
          label="Guna"
          required
          {...register("ayurvedicProperties.guna")}
          error={errors.ayurvedicProperties?.guna?.message}
        />
        <Input
          label="Vipaka"
          required
          {...register("ayurvedicProperties.vipaka")}
          error={errors.ayurvedicProperties?.vipaka?.message}
        />
      </div>
      <h2 className="text-[18px] font-semibold">Important formulations</h2>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4">
            <ImageUpload
              width={151}
              height={38}
              name={`importantFormulations.${index}.image`}
              control={control}
              error={errors.importantFormulations?.[index]?.image?.message}
              type="icon"
            >
              <Image
                src={"/images/image-upload-icon.svg"}
                alt=""
                width={24}
                height={24}
                className="mr-2 object-contain"
              />
              <span className="font-medium">Upload Icon</span>
            </ImageUpload>
            <div className="flex-1">
              <Input
                required
                {...register(`importantFormulations.${index}.description`)}
                error={
                  errors.importantFormulations?.[index]?.description?.message
                }
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

      <h2 className="text-[18px] font-semibold">Therapeutic uses</h2>

      <div className="flex flex-col gap-3">
        {whyToUseFields.map((field, index) => (
          <div key={field.id} className="flex gap-5">
            <Input
              {...register(`therapeuticUses.${index}.description`)}
              error={errors.therapeuticUses?.[index]?.description?.message}
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
    </form>
  );
}
