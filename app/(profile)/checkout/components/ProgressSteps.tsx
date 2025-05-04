'use client';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';

type ProgressStepsProps = {
    step: number;
    steps: string[];
};

const ProgressSteps: React.FC<ProgressStepsProps> = ({ step, steps }) => {
    const { t } = useLanguage();
    return (
        <div className="relative flex justify-between mb-12">
            <div className="absolute top-4 left-0 h-1 bg-gray-400 w-full -z-10"></div>
            <div
                className="absolute top-4 left-0 h-1 bg-black -z-10 transition-all duration-500"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((_, i) => (
                <div key={i} className="flex flex-col items-center relative">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all duration-300
                        ${step > i + 1 ? 'bg-[#6e7a34] text-white' :
                            step === i + 1 ? 'bg-[#6e7a34] text-white ring-4 ring-blue-100' :
                                'bg-white text-gray-400 border border-gray-200'}`}>
                        {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span className={`text-xs font-medium mt-2 ${step >= i + 1 ? 'text-[#6e7a34]' : 'text-gray-500'}`}>
                        {i === 0 ? t.paymentPage.progressSteps.step1 : i === 1 ? t.paymentPage.progressSteps.step2 : t.paymentPage.progressSteps.step3}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ProgressSteps;