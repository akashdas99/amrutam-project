"use client";
import { useIngredientStoreSelector } from "@/store/ingredientStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RefObject, useImperativeHandle, useState } from "react";
import StepBackButton from "../ui/stepBackButton";
import { BenefitsFormData } from "./benefits";
import { GeneralInfoFormData } from "./generalInfo";
import { OthersFormData } from "./others";
import { OverviewItemWithIcon } from "./overviewItemWithIcon";
import { OverviewList } from "./overviewList";
import { OverviewSection } from "./overviewSection";
import { PropertiesFormData } from "./properties";
import IngredientDropdownMenu from "../ui/dropdownMenu";
import { useStepStoreSelector } from "@/store/stepStore";

export type OverviewFormData = GeneralInfoFormData &
  BenefitsFormData &
  PropertiesFormData &
  OthersFormData;

interface OverviewProps {
  ref?: RefObject<{ submitForm: () => void } | null>;
  showMenu?: boolean;
}

export default function Overview({ ref, showMenu = false }: OverviewProps) {
  const { ingredient: data } = useIngredientStoreSelector("ingredient");
  const router = useRouter();
  const { setStep } = useStepStoreSelector("setStep");

  const [isActive, setIsActive] = useState<number[]>([]);
  const onToggleStatus = (i: number) => {
    setIsActive((prev) =>
      prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]
    );
  };
  const onEdit = (i: number) => {
    setStep(i);
    router.push("/ingredients/add");
  };
  useImperativeHandle(
    ref,
    () => ({
      submitForm: () => {
        router.push("/ingredients/details");
      },
    }),
    []
  );

  return (
    <div className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
      {/* General Information */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-2xl font-semibold ">General Information</h1>
            <Image
              src={
                isActive.includes(0)
                  ? "/images/tick.png"
                  : "/images/inactive.png"
              }
              alt="img"
              width={24}
              height={24}
            />
          </div>
          {showMenu ? (
            <IngredientDropdownMenu
              isActive={isActive.includes(0)}
              onToggleStatus={() => onToggleStatus(0)}
              onEdit={() => onEdit(1)}
            />
          ) : (
            <StepBackButton step={1} />
          )}
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
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-2xl">
              {data?.ingredientName} - {data?.scientificName} (Sanskrit-
              {data?.sanskritName})
            </h2>
            {showMenu && (
              <Image
                src={
                  isActive.includes(1)
                    ? "/images/tick.png"
                    : "/images/inactive.png"
                }
                alt="status"
                width={24}
                height={24}
              />
            )}
          </div>
          {showMenu ? (
            <IngredientDropdownMenu
              isActive={isActive.includes(1)}
              onToggleStatus={() => onToggleStatus(1)}
              onEdit={() => onEdit(1)}
            />
          ) : (
            <StepBackButton step={1} />
          )}
        </div>
        <h3 className="text-2xl font-semibold">Description</h3>
        <p className="text-xl">{data?.description}</p>
      </section>

      {/* Why To Use */}
      <OverviewSection
        title={`Why ${data?.ingredientName} ?`}
        withDivider
        step={2}
        showMenu={showMenu}
        isActive={isActive.includes(2)}
        onToggleStatus={() => onToggleStatus(2)}
        onEdit={() => onEdit(2)}
      >
        <OverviewList items={data?.whyToUse} />
      </OverviewSection>

      {/* Prakriti Impact */}
      <OverviewSection
        title="Prakriti Impact"
        withDivider
        step={2}
        showMenu={showMenu}
        isActive={isActive.includes(3)}
        onToggleStatus={() => onToggleStatus(3)}
        onEdit={() => onEdit(2)}
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
        step={2}
        showMenu={showMenu}
        isActive={isActive.includes(4)}
        onToggleStatus={() => onToggleStatus(4)}
        onEdit={() => onEdit(2)}
      >
        <OverviewItemWithIcon items={data?.benefits} />
      </OverviewSection>

      {/* Ayurvedic Properties */}
      <OverviewSection
        title="Ayurvedic Properties"
        withDivider
        step={3}
        showMenu={showMenu}
        isActive={isActive.includes(5)}
        onToggleStatus={() => onToggleStatus(5)}
        onEdit={() => onEdit(3)}
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
        step={3}
        showMenu={showMenu}
        isActive={isActive.includes(6)}
        onToggleStatus={() => onToggleStatus(6)}
        onEdit={() => onEdit(3)}
      >
        <OverviewItemWithIcon items={data?.importantFormulations} />
      </OverviewSection>

      {/* Therapeutic Uses */}
      <OverviewSection
        title="Therapeutic Uses"
        withDivider
        step={3}
        showMenu={showMenu}
        isActive={isActive.includes(7)}
        onToggleStatus={() => onToggleStatus(7)}
        onEdit={() => onEdit(3)}
      >
        <OverviewList items={data?.therapeuticUses} />
      </OverviewSection>

      {/* Plant Parts and Its Purpose */}
      <OverviewSection
        title="Plant Parts and Its Purpose"
        withDivider
        step={4}
        showMenu={showMenu}
        isActive={isActive.includes(8)}
        onToggleStatus={() => onToggleStatus(8)}
        onEdit={() => onEdit(4)}
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
        step={4}
        showMenu={showMenu}
        isActive={isActive.includes(9)}
        onToggleStatus={() => onToggleStatus(9)}
        onEdit={() => onEdit(4)}
      >
        <p className="text-xl font-medium">{data?.bestCombinedWith}</p>
      </OverviewSection>

      {/* Geographical Locations */}
      <OverviewSection
        title="Geographical Locations"
        step={4}
        showMenu={showMenu}
        isActive={isActive.includes(10)}
        onToggleStatus={() => onToggleStatus(10)}
        onEdit={() => onEdit(4)}
      >
        <p className="text-xl font-medium">{data?.geographicalLocations}</p>
      </OverviewSection>
    </div>
  );
}
