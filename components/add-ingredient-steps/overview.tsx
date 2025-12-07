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

  return (
    <div className="bg-foreground p-6 rounded-2xl flex flex-col gap-8">
      <h1 className="text-[18px] font-semibold">Overview</h1>

      {/* General Information */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">General Information</h2>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Ingredient Name</p>
              <p className="text-sm font-medium">{data.ingredientName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Scientific Name</p>
              <p className="text-sm font-medium">{data.scientificName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Sanskrit Name</p>
              <p className="text-sm font-medium">{data.sanskritName}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Description</p>
            <p className="text-sm">{data.description}</p>
          </div>
          {data.image && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Image</p>
              <img
                src={data.image}
                alt={data.ingredientName}
                className="w-[220px] h-[220px] object-cover rounded-2xl"
              />
            </div>
          )}
        </div>
      </section>

      {/* Why To Use */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">Why To Use</h2>
        <ul className="list-disc list-inside space-y-2">
          {data?.whyToUse?.map((item, index) => (
            <li key={index} className="text-sm">
              {item.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Prakriti Impact */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">Prakriti Impact</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Vata</p>
            <p className="text-sm font-medium">{data?.prakritiImpact?.vata}</p>
            {data?.prakritiImpact?.vataReason && (
              <p className="text-xs text-gray-600 mt-1">
                {data.prakritiImpact.vataReason}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Pitta</p>
            <p className="text-sm font-medium">{data?.prakritiImpact?.pitta}</p>
            {data?.prakritiImpact?.pittaReason && (
              <p className="text-xs text-gray-600 mt-1">
                {data?.prakritiImpact?.pittaReason}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Kapha</p>
            <p className="text-sm font-medium">{data?.prakritiImpact?.kapha}</p>
            {data?.prakritiImpact?.kaphaReason && (
              <p className="text-xs text-gray-600 mt-1">
                {data.prakritiImpact.kaphaReason}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">Benefits</h2>
        <div className="grid grid-cols-2 gap-4">
          {data?.benefits?.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border-2 border-light-gray rounded-xl"
            >
              {benefit.image && (
                <img
                  src={benefit.image}
                  alt=""
                  className="w-12 h-12 object-contain"
                />
              )}
              <p className="text-sm flex-1">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ayurvedic Properties */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">Ayurvedic Properties</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Rasa</p>
            <p className="text-sm font-medium">
              {data?.ayurvedicProperties?.rasa}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Veerya</p>
            <p className="text-sm font-medium">
              {data?.ayurvedicProperties?.veerya}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Guna</p>
            <p className="text-sm font-medium">
              {data?.ayurvedicProperties?.guna}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Vipaka</p>
            <p className="text-sm font-medium">
              {data?.ayurvedicProperties?.vipaka}
            </p>
          </div>
        </div>
      </section>

      {/* Important Formulations */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">
          Important Formulations
        </h2>
        <div className="flex flex-col gap-3">
          {data?.importantFormulations?.map((formulation, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border-2 border-light-gray rounded-xl"
            >
              {formulation.image && (
                <img
                  src={formulation.image}
                  alt=""
                  className="w-[151px] h-[38px] object-contain"
                />
              )}
              <p className="text-sm flex-1">{formulation.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Therapeutic Uses */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">Therapeutic Uses</h2>
        <ul className="list-disc list-inside space-y-2">
          {data?.therapeuticUses?.map((use, index) => (
            <li key={index} className="text-sm">
              {use?.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Plant Parts and Its Purpose */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">
          Plant Parts and Its Purpose
        </h2>
        <div className="p-4 border-2 border-light-gray rounded-xl">
          <div className="flex gap-8 mb-3">
            <h3 className="font-medium flex-1">Type</h3>
            <h3 className="font-medium flex-3">Description</h3>
          </div>
          <div className="border-t border-light-gray mb-3"></div>
          <div className="space-y-3">
            {data?.plantParts?.map((part, index) => (
              <div key={index} className="flex gap-8">
                <p className="text-sm flex-1 text-gray">{part?.plantPart}</p>
                <p className="text-sm flex-3 text-gray">{part?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Combined With */}
      <section>
        <div>
          <p className="text-xs text-gray-500 mb-1">Best Combined With</p>
          <p className="text-sm">{data?.bestCombinedWith}</p>
        </div>
      </section>

      {/* Geographical Locations */}
      <section>
        <div>
          <p className="text-xs text-gray-500 mb-1">Geographical Locations</p>
          <p className="text-sm">{data?.geographicalLocations}</p>
        </div>
      </section>
    </div>
  );
}
