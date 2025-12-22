'use client';
import { SiUbereats, SiDoordash } from "react-icons/si";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Order() {
    return (
        <section id="order" className="relative py-24 bg-[url('/images/black_gold_pattern.png')] bg-cover bg-center bg-fixed text-white md:h-[600px] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-black/75 pointer-events-none" />
            <div className="container text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto flex flex-col items-center"
                >
                    <h2 className="text-5xl font-serif text-primary mb-6 md:text-6xl">Order Online</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Craving Haveli at home? Order directly from our website for the best experience.
                    </p>

                    {/* Main CTA */}
                    <div className="mb-16 w-full flex justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-black text-xl px-12 py-8 rounded-full font-bold shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all transform hover:-translate-y-1"
                        >
                            <Link href="/order">
                                Order Now
                            </Link>
                        </Button>
                    </div>

                    {/* Third Party Options */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="flex items-center gap-4 w-full max-w-md">
                            <div className="h-px bg-white/10 flex-1" />
                            <span className="text-sm text-gray-500 font-medium uppercase tracking-widest">Or via partners</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://www.ubereats.com/store/haveli-indian-kitchen/nt_3PBuyQ86A8eNPISQWzA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    className="bg-black/40 border-white/30 hover:bg-primary/10 backdrop-blur-xs text-white gap-3 h-12 px-6 rounded-xl hover:border-primary/50 transition-all group"
                                >
                                    <div className="bg-[#06C167] p-1 rounded-full text-black">
                                        <SiUbereats className="text-sm text-white" />
                                    </div>
                                    <span className="group-hover:text-primary transition-colors">UberEats</span>
                                </Button>
                            </a>

                            <a
                                href="https://www.doordash.com/store/haveli-indian-cuisine-greater-carrollwood-392636/15361158/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    className="bg-black/40 border-white/30 hover:bg-primary/10 backdrop-blur-xs text-white gap-3 h-12 px-6 rounded-xl hover:border-primary/50 transition-all group"
                                >
                                    <div className="bg-[#FF3008] p-1 rounded-full text-black">
                                        <SiDoordash className="text-sm text-white" />
                                    </div>
                                    <span className="group-hover:text-primary transition-colors">DoorDash</span>
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
