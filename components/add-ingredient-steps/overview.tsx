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
import Button from "../ui/button";

export type OverviewFormData = GeneralInfoFormData &
  BenefitsFormData &
  PropertiesFormData &
  OthersFormData;

interface OverviewProps {
  onSubmit: () => void;
  ref: RefObject<{ submitForm: () => void } | null>;
  stepBack: (data: number) => void;
}

export default function Overview({ onSubmit, ref, stepBack }: OverviewProps) {
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

  return (
    <div className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
      {/* General Information */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">General Information</h1>
          <Button
            type="button"
            variant="ghost"
            outlined
            className="w-9 h-9 bg-light-gray/50 border-0 rounded-lg"
            onClick={() => stepBack(0)}
          >
            <Image
              src={"/images/step-back.png"}
              alt=""
              width={20}
              height={16}
              className="mx-auto"
            />
          </Button>
        </div>
        {data?.image && (
          <Image
            src={data?.image}
            alt="img"
            width={460}
            height={339}
            className="mx-auto mb-8"
          />
        )}
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">
            {data?.ingredientName} - {data?.scientificName} (Sanskrit-
            {data?.sanskritName})
          </h2>
          <Button
            type="button"
            variant="ghost"
            outlined
            className="w-9 h-9 bg-light-gray/50 border-0 rounded-lg"
            onClick={() => stepBack(0)}
          >
            <Image
              src={"/images/step-back.png"}
              alt=""
              width={20}
              height={16}
              className="mx-auto"
            />
          </Button>
        </div>
        <h3 className="text-2xl font-semibold">Description</h3>
        <p className="text-xl">{data?.description}</p>
      </section>

      {/* Why To Use */}
      <OverviewSection
        title={`Why ${data?.ingredientName} ?`}
        withDivider
        stepBack={() => stepBack(1)}
      >
        <OverviewList items={data?.whyToUse} />
      </OverviewSection>

      {/* Prakriti Impact */}
      <OverviewSection
        title="Prakriti Impact"
        withDivider
        stepBack={() => stepBack(1)}
      >
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
      <OverviewSection
        title="Benefits"
        withDivider
        stepBack={() => stepBack(1)}
      >
        <OverviewItemWithIcon items={data?.benefits} />
      </OverviewSection>

      {/* Ayurvedic Properties */}
      <OverviewSection
        title="Ayurvedic Properties"
        withDivider
        stepBack={() => stepBack(2)}
      >
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          <li>Rasa - {data?.ayurvedicProperties?.rasa}</li>
          <li>Veerya - {data?.ayurvedicProperties?.veerya}</li>
          <li>Guna - {data?.ayurvedicProperties?.guna}</li>
          <li>Vipaka - {data?.ayurvedicProperties?.vipaka}</li>
        </ul>
      </OverviewSection>

      {/* Important Formulations */}
      <OverviewSection
        title="Important Formulations"
        withDivider
        stepBack={() => stepBack(2)}
      >
        <OverviewItemWithIcon items={data?.importantFormulations} />
      </OverviewSection>

      {/* Therapeutic Uses */}
      <OverviewSection
        title="Therapeutic Uses"
        withDivider
        stepBack={() => stepBack(2)}
      >
        <OverviewList items={data?.therapeuticUses} />
      </OverviewSection>

      {/* Plant Parts and Its Purpose */}
      <OverviewSection
        title="Plant Parts and Its Purpose"
        withDivider
        stepBack={() => stepBack(3)}
      >
        <ul className="list-disc list-inside ml-3 text-xl font-medium space-y-4">
          {data?.plantParts?.map((item, index) => (
            <li key={index}>
              {item?.plantPart} - {item?.description}
            </li>
          ))}
        </ul>
      </OverviewSection>

      {/* Best Combined With */}
      <OverviewSection
        title="Best Combined With"
        withDivider
        stepBack={() => stepBack(3)}
      >
        <p className="text-xl font-medium">{data?.bestCombinedWith}</p>
      </OverviewSection>

      {/* Geographical Locations */}
      <OverviewSection
        title="Geographical Locations"
        stepBack={() => stepBack(3)}
      >
        <p className="text-xl font-medium">{data?.geographicalLocations}</p>
      </OverviewSection>
    </div>
  );
}
