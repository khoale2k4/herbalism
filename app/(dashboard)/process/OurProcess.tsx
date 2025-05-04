'use client';

import Image from 'next/image';
import { ArrowDown, Flame, Leaf, Droplets, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function OurProcess() {
    const { t } = useLanguage();
    const { hero, paracelsus, origins, principles, steps, transformation, final } = t.ourProcessData;

    return (
        <main className="max-w-6xl mx-auto px-4 py-16 space-y-24 text-gray-800">
            <section className="text-center relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 to-transparent rounded-3xl" />
                <div className="py-16 px-4">
                    <h1 className="text-5xl font-bold mb-6 text-emerald-900">{hero.title}</h1>
                    <p className="text-2xl italic mb-8 text-emerald-700">{hero.subtitle}</p>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg">{hero.description}</p>
                    </div>
                    <div className="mt-12 animate-bounce">
                        <ArrowDown className="mx-auto text-emerald-600" size={32} />
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <div className="bg-amber-50 p-1 inline-block rounded-full mb-4">
                        <span className="bg-amber-100 px-4 py-1 rounded-full text-amber-800 font-medium">
                            {paracelsus.badge}
                        </span>
                    </div>
                    <h2 className="text-3xl font-semibold mb-6">{paracelsus.title}</h2>
                    <div className="space-y-4 text-lg">
                        {paracelsus.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
                <div className="order-1 md:order-2">
                    <div className="relative w-full h-[500px] shadow-xl rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <Image
                            src={paracelsus.imageUrl}
                            alt="Paracelsus"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 p-12 rounded-3xl">
                <h2 className="text-3xl font-semibold mb-8 text-center">{origins.title}</h2>
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-center gap-12 items-center mb-12">
                        {origins.spagyricRoots.map((root, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md flex-1 text-center">
                                <h3 className="text-xl font-medium mb-2 text-emerald-800">{root.term}</h3>
                                <p className="text-lg">{root.definition}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-lg mb-8">{origins.description1}</p>

                    <div className="text-center mb-8">
                        <p className="text-2xl font-serif italic text-amber-700">{origins.quote}</p>
                    </div>

                    <p className="text-lg">{origins.description2}</p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-12 text-center">{principles.title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {principles.items.map((principle, index) => {
                        const colors = [
                            { bgFrom: 'from-amber-50', bgTo: 'to-amber-100', iconBg: 'bg-amber-200', iconColor: 'text-amber-600' },
                            { bgFrom: 'from-green-50', bgTo: 'to-green-100', iconBg: 'bg-green-200', iconColor: 'text-green-600' },
                            { bgFrom: 'from-blue-50', bgTo: 'to-blue-100', iconBg: 'bg-blue-200', iconColor: 'text-blue-600' }
                        ];
                        const Icon = principle.icon === 'Sparkles' ? Sparkles :
                            principle.icon === 'Flame' ? Flame : Droplets;

                        return (
                            <div key={index} className={`bg-gradient-to-b ${colors[index].bgFrom} ${colors[index].bgTo} p-8 rounded-2xl shadow-md`}>
                                <div className={`w-16 h-16 ${colors[index].iconBg} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                                    <Icon size={32} className={colors[index].iconColor} />
                                </div>
                                <h3 className="text-2xl font-semibold mb-4 text-center">{principle.title}</h3>
                                <p className="text-center text-lg">{principle.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="bg-gradient-to-br from-emerald-50 to-transparent p-12 rounded-3xl">
                <h2 className="text-3xl font-semibold mb-12 text-center">{steps.title}</h2>

                <div className="space-y-16 max-w-4xl mx-auto">
                    {steps.items.map((step) => (
                        <div key={step.step} className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-lg">
                                    <span className="text-2xl font-bold text-emerald-800">{step.step}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-3 text-emerald-800">{step.title}</h3>
                                <p className="text-lg">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold mb-8 text-center">{transformation.title}</h2>
                <div className="bg-stone-50 p-8 rounded-2xl mb-12">
                    <p className="text-lg text-center italic mb-8">{transformation.intro}</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {transformation.steps.map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="font-bold text-amber-800">{step.number}</span>
                                </div>
                                <p className="text-center">
                                    <strong>{step.title}</strong> {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center text-lg italic">
                    <p>Spagyric medicine teaches us this truth:</p>
                    {transformation.teachings.map((teaching, index) => (
                        <p key={index} className="mt-2 text-xl text-emerald-800">{teaching}</p>
                    ))}
                </div>
            </section>

            <section className="text-center border-t border-gray-200 pt-16">
                <div className="inline-block mb-8">
                    {final.icon === "Leaf" && <Leaf size={48} className="text-emerald-500 mx-auto" />}
                </div>
                <h2 className="text-3xl font-semibold mb-6">{final.title}</h2>
                <p className="max-w-3xl mx-auto text-lg">{final.description}</p>
            </section>
        </main>
    );
}