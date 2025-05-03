import Image from 'next/image';
import { ArrowDown, Flame, Leaf, Droplets, Sparkles } from 'lucide-react';

export default function OurProcess() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-16 space-y-24 text-gray-800">
            {/* Hero Section */}
            <section className="text-center relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 to-transparent rounded-3xl" />
                <div className="py-16 px-4">
                    <h1 className="text-5xl font-bold mb-6 text-emerald-900">Our Process</h1>
                    <p className="text-2xl italic mb-8 text-emerald-700">Spagyric – The Sacred Alchemy of Healing</p>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg">
                            In the rich tradition of Western alchemy, Spagyric is more than a method of herbal preparation—it is a profound
                            philosophical symbol of transformation—of matter, soul, and the human being.
                        </p>
                    </div>
                    <div className="mt-12 animate-bounce">
                        <ArrowDown className="mx-auto text-emerald-600" size={32} />
                    </div>
                </div>
            </section>

            {/* Paracelsus Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <div className="bg-amber-50 p-1 inline-block rounded-full mb-4">
                        <span className="bg-amber-100 px-4 py-1 rounded-full text-amber-800 font-medium">The Alchemist</span>
                    </div>
                    <h2 className="text-3xl font-semibold mb-6">Paracelsus</h2>
                    <div className="space-y-4 text-lg">
                        <p>
                            Paracelsus (1493–1541), born Philippus Aureolus Theophrastus Bombastus von Hohenheim, was a Swiss-German
                            alchemist, physician, astrologer, botanist, and philosopher.
                        </p>
                        <p>
                            A revolutionary thinker of the Renaissance, he is regarded not only as the father of Spagyric alchemy,
                            but also as a pioneer of iatrochemistry—a precursor to modern pharmaceutical science.
                        </p>
                        <p>
                            Paracelsus introduced a holistic view of medicine, one that treated illness not as an isolated symptom,
                            but as an imbalance of the whole being—requiring healing at the root.
                        </p>
                    </div>
                </div>
                <div className="order-1 md:order-2">
                    <div className="relative w-full h-[500px] shadow-xl rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <Image
                            src="https://merian-alchemie.ub.uni-frankfurt.de/wp-content/uploads/Rubens-Paracelsus_Beitrag-Esposito-1200x1722.jpg"
                            alt="Paracelsus"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Origins Section */}
            <section className="bg-gray-50 p-12 rounded-3xl">
                <h2 className="text-3xl font-semibold mb-8 text-center">The Alchemical Origins of Spagyric</h2>
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-center gap-12 items-center mb-12">
                        <div className="bg-white p-6 rounded-xl shadow-md flex-1 text-center">
                            <h3 className="text-xl font-medium mb-2 text-emerald-800">Spao</h3>
                            <p className="text-lg">to separate</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md flex-1 text-center">
                            <h3 className="text-xl font-medium mb-2 text-emerald-800">Ageiro</h3>
                            <p className="text-lg">to recombine</p>
                        </div>
                    </div>

                    <p className="text-lg mb-8">
                        This principle, "separate – purify – reunite," lies at the heart of Spagyric. It reflects the timeless alchemical axiom:
                    </p>

                    <div className="text-center mb-8">
                        <p className="text-2xl font-serif italic text-amber-700">"Solve et Coagula" – dissolve to recombine.</p>
                    </div>

                    <p className="text-lg">
                        In Spagyric, plants are broken down into their three fundamental components—Spirit, Soul, and Body—each one purified,
                        then reunited to create an Elixir that embodies the complete essence of the plant, physically and energetically.
                    </p>
                </div>
            </section>

            {/* Three Principles Section */}
            <section>
                <h2 className="text-3xl font-semibold mb-12 text-center">The Three Sacred Principles</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-b from-stone-50 to-stone-100 p-8 rounded-2xl shadow-md">
                        <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Sparkles size={32} className="text-stone-600" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-center">Salt</h3>
                        <p className="text-center text-lg">The Body: structure and mineral foundation</p>
                    </div>

                    <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-8 rounded-2xl shadow-md">
                        <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Flame size={32} className="text-amber-600" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-center">Sulfur</h3>
                        <p className="text-center text-lg">The Soul: essence, emotions, and will</p>
                    </div>

                    <div className="bg-gradient-to-b from-sky-50 to-sky-100 p-8 rounded-2xl shadow-md">
                        <div className="w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Droplets size={32} className="text-sky-600" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4 text-center">Mercury</h3>
                        <p className="text-center text-lg">The Spirit: the volatile force, life and consciousness</p>
                    </div>
                </div>
            </section>

            {/* Process Steps Section */}
            <section className="bg-gradient-to-br from-emerald-50 to-transparent p-12 rounded-3xl">
                <h2 className="text-3xl font-semibold mb-12 text-center">The Classical Spagyric Process</h2>

                <div className="space-y-16 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-2xl font-bold text-emerald-800">1</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-3 text-emerald-800">Fermentation & Distillation: Extracting the Spirit</h3>
                            <p className="text-lg">
                                The plant matter is fermented to produce alcohol, then distilled to obtain the plant's "living spirit"—its vital essence.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-2xl font-bold text-emerald-800">2</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-3 text-emerald-800">Maceration & Extraction: Extracting the Soul</h3>
                            <p className="text-lg">
                                The leftover plant material is macerated in the alcohol to release its soul—the essential oils, resins,
                                and subtle compounds—followed by careful filtration.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-2xl font-bold text-emerald-800">3</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-3 text-emerald-800">Calcination: Purifying the Body</h3>
                            <p className="text-lg">
                                The plant residue is incinerated at high heat into white ash, then repeatedly washed and purified
                                to yield mineral salts—the body of the plant.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-lg">
                                <span className="text-2xl font-bold text-emerald-800">4</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-3 text-emerald-800">Recombination: Coagula – uniting all elements</h3>
                            <p className="text-lg">
                                The purified salts (Body), essential extracts (Soul), and distilled alcohol (Spirit) are finally
                                recombined into a unified Spagyric Elixir, embodying the full spectrum of the plant's healing potential.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transformation Section */}
            <section className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold mb-8 text-center">Spagyric as a Sacred Path of Inner Transformation</h2>
                <div className="bg-stone-50 p-8 rounded-2xl mb-12">
                    <p className="text-lg text-center italic mb-8">
                        To a true alchemist, crafting a Spagyric remedy is not just making medicine—it is a sacred ritual.
                        Every stage of the process mirrors an inner transformation:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="font-bold text-amber-800">1</span>
                            </div>
                            <p className="text-center">
                                <strong>Burning the plant's residue</strong> symbolizes letting go of the old self, the ego.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="font-bold text-amber-800">2</span>
                            </div>
                            <p className="text-center">
                                <strong>Extracting the essence</strong> is an act of devotion to nature's purity.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <span className="font-bold text-amber-800">3</span>
                            </div>
                            <p className="text-center">
                                <strong>Recombining the elements</strong> reflects the soul's rebirth—a higher, more luminous state of being.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center text-lg italic">
                    <p>Spagyric medicine teaches us this truth:</p>
                    <p className="mt-2 text-xl text-emerald-800">Nothing is wasted. Even ashes contain wisdom.</p>
                    <p className="mt-2 text-xl text-emerald-800">The dark serves the light. The separation is necessary for wholeness.</p>
                </div>
            </section>

            {/* Final Section */}
            <section className="text-center border-t border-gray-200 pt-16">
                <div className="inline-block mb-8">
                    <Leaf size={48} className="text-emerald-500 mx-auto" />
                </div>
                <h2 className="text-3xl font-semibold mb-6">A Gift from Earth and Sky</h2>
                <p className="max-w-3xl mx-auto text-lg">
                    Spagyric is more than herbal medicine—it's a journey of unity between human, nature, and cosmos.
                    It reconnects us to the elemental and the divine.
                </p>
            </section>
        </main>
    );
}