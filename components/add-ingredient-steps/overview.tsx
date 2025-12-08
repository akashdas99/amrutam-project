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
import { filterEmpty } from "@/lib/utils";

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

  const [isActive, setIsActive] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
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
            {showMenu && (
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
            )}
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
        <h2 className="font-bold text-2xl">
          {data?.ingredientName} - {data?.scientificName} (Sanskrit-
          {data?.sanskritName})
        </h2>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold">Description</h3>
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

        <p className="text-xl">{data?.description}</p>
      </section>

      {/* Why To Use */}
      {data?.whyToUse && filterEmpty(data.whyToUse).length > 0 && (
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
      )}

      {/* Prakriti Impact */}
      {data?.prakritiImpact &&
        (data.prakritiImpact.vata ||
          data.prakritiImpact.kapha ||
          data.prakritiImpact.pitta) && (
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
                Vata - {data?.prakritiImpact?.vata} -{" "}
                {data?.prakritiImpact?.vataReason || "none"}
              </li>
              <li>
                Kapha - {data?.prakritiImpact?.kapha} -{" "}
                {data?.prakritiImpact?.kaphaReason || "none"}
              </li>
              <li>
                Pitta - {data?.prakritiImpact?.pitta} -{" "}
                {data?.prakritiImpact?.pittaReason || "none"}
              </li>
            </ul>
          </OverviewSection>
        )}

      {/* Benefits */}
      {data?.benefits && filterEmpty(data?.benefits).length > 0 && (
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
      )}

      {/* Ayurvedic Properties */}
      {data?.ayurvedicProperties &&
        (data.ayurvedicProperties.rasa ||
          data.ayurvedicProperties.veerya ||
          data.ayurvedicProperties.guna ||
          data.ayurvedicProperties.vipaka) && (
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
        )}

      {/* Important Formulations */}
      {data?.importantFormulations &&
        filterEmpty(data?.importantFormulations).length > 0 && (
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
        )}

      {/* Therapeutic Uses */}
      {data?.therapeuticUses &&
        filterEmpty(data.therapeuticUses).length > 0 && (
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
        )}

      {/* Plant Parts and Its Purpose */}
      {data?.plantParts && data.plantParts.length > 0 && (
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
      )}

      {/* Best Combined With */}
      {data?.bestCombinedWith && (
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
      )}

      {/* Geographical Locations */}
      {data?.geographicalLocations && (
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
      )}
    </div>
  );
}
