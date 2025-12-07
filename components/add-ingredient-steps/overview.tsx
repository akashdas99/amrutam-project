import { GeneralInfoFormData } from "./generalInfo";
import { BenefitsFormData } from "./benefits";
import { PropertiesFormData } from "./properties";
import { OthersFormData } from "./others";
import Image from "next/image";
import { RefObject, useImperativeHandle } from "react";
import { useIngredientStoreSelector } from "@/store/ingredientStore";
import { OverviewSection } from "./overviewSection";
import { OverviewList } from "./overviewList";
import { OverviewItemWithIcon } from "./overviewItemWithIcon";

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
      <OverviewSection title={`Why ${data?.ingredientName} ?`} withDivider>
        <OverviewList items={data?.whyToUse} />
      </OverviewSection>

      {/* Prakriti Impact */}
      <OverviewSection title="Prakriti Impact" withDivider>
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
      </OverviewSection>

      {/* Benefits */}
      <OverviewSection title="Benefits" withDivider>
        <OverviewItemWithIcon items={data?.benefits} />
      </OverviewSection>

      {/* Ayurvedic Properties */}
      <OverviewSection title="Ayurvedic Properties" withDivider>
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          <li>Rasa - {data?.ayurvedicProperties?.rasa}</li>
          <li>Veerya - {data?.ayurvedicProperties?.veerya}</li>
          <li>Guna - {data?.ayurvedicProperties?.guna}</li>
          <li>Vipaka - {data?.ayurvedicProperties?.vipaka}</li>
        </ul>
      </OverviewSection>

      {/* Important Formulations */}
      <OverviewSection title="Important Formulations">
        <OverviewItemWithIcon items={data?.importantFormulations} />
      </OverviewSection>

      {/* Therapeutic Uses */}
      <OverviewSection title="Therapeutic Uses">
        <OverviewList items={data?.therapeuticUses} />
      </OverviewSection>

      {/* Plant Parts and Its Purpose */}
      <OverviewSection title="Plant Parts and Its Purpose">
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          {data?.plantParts?.map((item, index) => (
            <li key={index}>
              {item?.plantPart} - {item?.description}
            </li>
          ))}
        </ul>
      </OverviewSection>

      {/* Best Combined With */}
      <OverviewSection title="Best Combined With">
        <p className="text-xl font-medium">{data?.bestCombinedWith}</p>
      </OverviewSection>

      {/* Geographical Locations */}
      <OverviewSection title="Geographical Locations">
        <p className="text-xl font-medium">{data?.geographicalLocations}</p>
      </OverviewSection>
    </div>
  );
}
