'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="relative overflow-hidden py-24 md:py-36">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[rgba(212,175,55,0.05)] to-transparent pointer-events-none" />
            {/* Bottom blend */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 -z-10">
                            <Image
                                src="/images/logo.png"
                                alt=""
                                width={400}
                                height={400}
                                className="w-3/4 h-auto object-contain"
                            />
                        </div>
                        <h2 className="text-5xl font-serif text-text mb-6 md:text-6xl">
                            Our Story
                        </h2>
                        <div className="w-20 h-1 bg-primary mb-8" />
                        <p className="text-text-muted text-lg leading-relaxed mb-6">
                            Haveli Indian Kitchen was born from a passion to bring the authentic taste of India to your plate.
                            "Haveli" translates to a traditional mansion in India, symbolizing heritage, hospitality, and grandeur.
                        </p>
                        <p className="text-text-muted text-lg leading-relaxed mb-6">
                            Our chefs use age-old techniques and the freshest ingredients to craft dishes that are not just food,
                            but an experience. From the clay ovens of Punjab to the coastal spices of the South, we invite you
                            on a culinary journey through India.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative w-full"
                    >
                        <div className="relative z-10 border-2 border-primary p-2 rounded-lg">
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/images/indoor.jpg"
                                    alt="Haveli Interior"
                                    fill
                                    className="object-cover rounded block"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        {/* Decorative offset box */}
                        <div className="absolute top-4 left-4 w-full h-full border border-black/10 rounded-lg -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
