"use client";

import useOnScreen from "@/hooks/useOnScreen";
import React from "react";
import RotatingText from "../RotateText/RotateText";
import { useLanguage } from "@/hooks/useLanguage";
import MadeInCanadaIcon from "../Icons/MadeinCanada";
import IngredientIcon from "../Icons/Ingredient";
import QualityFirstIcon from "../Icons/QualityFirst";
import FormulatedIcon from "../Icons/Formulated";

const DifferenceSection = () => {
  const [ref, isVisible] = useOnScreen();
  const { t } = useLanguage();
  const fillColor = '#3e4f3d';
  const strokeColor = '#000000';

  return (
    <div
      ref={ref}
      className={`relative bg-[#fdf8f7] overflow-hidden transition-opacity duration-700 min-h-[300px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="absolute top-[-40px] left-0 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
        <RotatingText text={t.features.spinningWords} radius={35} />
      </div>
      {isVisible && (
        <div className="bg-[#fdf8f7] text-black py-20 px-6">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold">{t.features.heading}</h2>
            <p className="mt-4">
              {t.features.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ingredient Source */}
            <div className="flex flex-col items-center">
              <MadeInCanadaIcon fillColor={fillColor} strokeColor={strokeColor}/>
              <h3 className="text-lg font-semibold">{t.features.ingredients.title}</h3>
              <p className="mt-2 text-center">
                {t.features.ingredients.description}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <IngredientIcon fillColor={fillColor} strokeColor={strokeColor}/>
              <h3 className="text-lg font-semibold">{t.features.quality.title}</h3>
              <p className="mt-2 text-center">
                {t.features.quality.description}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <QualityFirstIcon fillColor={fillColor} strokeColor={strokeColor}/>
              <h3 className="text-lg font-semibold">{t.features.formulated.title}</h3>
              <p className="mt-2 text-center">
                {t.features.formulated.description}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <FormulatedIcon fillColor={fillColor} strokeColor={strokeColor}/>
              <h3 className="text-lg font-semibold">{t.features.community.title}</h3>
              <p className="mt-2 text-center">
                {t.features.community.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DifferenceSection;
