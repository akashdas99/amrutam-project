import { GeneralInfoFormData } from "./generalInfo";
import { BenefitsFormData } from "./benefits";
import { PropertiesFormData } from "./properties";
import { OthersFormData } from "./others";
import Image from "next/image";
import { RefObject, useImperativeHandle } from "react";
import { useIngredientStoreSelector } from "@/store/ingredientStore";

export type OverviewFormData = GeneralInfoFormData &
  BenefitsFormData &
  PropertiesFormData &
  OthersFormData;

interface OverviewProps {
  onSubmit: () => void;
  ref: RefObject<{ submitForm: () => void } | null>;
}

export default function Overview({ onSubmit, ref }: OverviewProps) {
  const { ingredient: data } = useIngredientStoreSelector("ingredient");

  useImperativeHandle(
    ref,
    () => ({
      submitForm: () => {
        onSubmit();
      },
    }),
    []
  );
  console.log(data);
  return (
    <div className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
      {/* General Information */}
      <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold mb-4">General Information</h1>
        {data?.image && (
          <Image
            src={data?.image}
            alt="img"
            width={460}
            height={339}
            className="mx-auto mb-8"
          />
        )}
        <h2 className="font-bold text-2xl">
          {data?.ingredientName} - {data?.scientificName} (Sanskrit-
          {data?.sanskritName})
        </h2>
        <h3 className="text-2xl font-semibold">Description</h3>
        <p className="text-xl">{data?.description}</p>
      </section>

      {/* Why To Use */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Why {data?.ingredientName} ?</h2>
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          {data?.whyToUse?.map((item, index) => (
            <li key={index}>{item.description}</li>
          ))}
        </ul>
      </section>
      <div className="border-t border-light-gray"></div>

      {/* Prakriti Impact */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Prakriti Impact</h2>
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          <li>
            Vata - {data?.prakritiImpact?.vata}-
            {data?.prakritiImpact?.vataReason}
          </li>
          <li>
            Kapha - {data?.prakritiImpact?.kapha}-
            {data?.prakritiImpact?.kaphaReason}
          </li>
          <li>
            Pitta - {data?.prakritiImpact?.pitta}-
            {data?.prakritiImpact?.pittaReason}
          </li>
        </ul>
      </section>
      <div className="border-t border-light-gray"></div>

      {/* Benefits */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Benefits</h2>

        {data?.benefits?.map((benefit, index) => (
          <div key={index} className="flex">
            {benefit.image && (
              <Image
                src={benefit.image}
                alt=""
                width={35}
                height={35}
                className="w-[35px] h-[35px] object-contain"
              />
            )}
            <p className="text-xl font-medium">{benefit?.description}</p>
          </div>
        ))}
      </section>
      <div className="border-t border-light-gray"></div>

      {/* Ayurvedic Properties */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Ayurvedic Properties</h2>
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          <li>Rasa - {data?.ayurvedicProperties?.rasa}</li>
          <li>Veerya - {data?.ayurvedicProperties?.veerya}</li>
          <li>Guna - {data?.ayurvedicProperties?.guna}</li>
          <li>Vipaka - {data?.ayurvedicProperties?.vipaka}</li>
        </ul>
      </section>
      <div className="border-t border-light-gray"></div>

      {/* Important Formulations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Important Formulations</h2>
        {data?.importantFormulations?.map((formulations, index) => (
          <div key={index} className="flex">
            {formulations?.image && (
              <Image
                src={formulations?.image}
                alt=""
                width={35}
                height={35}
                className="w-[35px] h-[35px] object-contain"
              />
            )}
            <p className="text-xl font-medium">{formulations?.description}</p>
          </div>
        ))}
      </section>

      {/* Therapeutic Uses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Therapeutic Uses</h2>
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          {data?.therapeuticUses?.map((item, index) => (
            <li key={index}>{item.description}</li>
          ))}
        </ul>
      </section>

      {/* Plant Parts and Its Purpose */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Plant Parts and Its Purpose
        </h2>
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          {data?.plantParts?.map((item, index) => (
            <li key={index}>
              {item?.plantPart} - {item?.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Best Combined With */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Combined With</h2>
        <p className="text-xl font-medium">{data?.bestCombinedWith}</p>
      </section>

      {/* Geographical Locations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Geographical Locations</h2>
        <p className="text-xl font-medium">{data?.geographicalLocations}</p>
      </section>
    </div>
  );
}
