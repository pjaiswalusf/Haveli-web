'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const items = [
    {
        id: 1,
        name: "Butter Chicken",
        description: "Tender chicken morsels simmered in a rich, creamy tomato sauce, finishing with a touch of fenugreek. A timeless classic.",
        image: "/images/butter-chicken.png",
        review: {
            text: <>The best <span className="text-white font-bold">butter chicken</span> I've ever had! Other dishes like vegetable Malabar are really good also as is the naan and mango lassi. I crave this place all the time. Totally addicted.</>,
            author: "T T",
            source: "Yelp reviews",
            rating: 5
        }
    },
    {
        id: 2,
        name: "Chicken Tikka",
        description: "Grilled chicken pieces marinated in yogurt and spices, served with tandoori sauce and naan. A flavorful and aromatic dish.",
        image: "/images/chicken-tikka.png",
        review: {
            text: <>The service was top-notch, with friendly and attentive staff who made excellent recommendations. But the real star of the show was the food - authentic, flavorful, and expertly prepared. The <span className="text-white font-bold">chicken tikka masala</span> was rich and creamy, the palak paneer was velvety smooth, and the garlic naan was perfectly crispy.</>,
            author: "Rutik Pol",
            source: "Google reviews",
            rating: 5
        }
    },
    {
        id: 3,
        name: "Garlic Naan",
        description: "Soft, oven-baked flatbread topped with minced garlic and fresh cilantro, brushed with butter. The perfect accompaniment.",
        image: "/images/naan.png",
        review: {
            text: <>Fantastic! The <span className="text-white font-bold">garlic naan</span> and cheese naan are insanely good; soft, hot, and full of flavor. The Chicken Tikka and Chicken Tikka Masala were delicious, flavorful, and perfectly seasoned. Great service and super cozy atmosphere. One of the best Indian spots in the area. Highly recommend!</>,
            author: "Brady B.",
            source: "Yelp reviews",
            rating: 5
        }
    }
];

interface MenuHighlightsProps {
    onOpenMenu: () => void;
}

export default function MenuHighlights({ onOpenMenu }: MenuHighlightsProps) {
    const targetRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Breakpoints for 3 items: 0-0.33, 0.33-0.66, 0.66-1
        if (latest < 0.33) {
            setActiveIndex(0);
        } else if (latest < 0.66) {
            setActiveIndex(1);
        } else {
            setActiveIndex(2);
        }
    });

    return (
        <section
            ref={targetRef}
            id="menu"
            // 300vh height to allow ample scroll distance for 3 items
            className="relative h-[300vh] bg-zinc-950"
        >
            <div className="sticky top-0 h-screen overflow-hidden bg-zinc-900">
                {/* Seamless Background Pattern */}
                <div className="absolute inset-0 bg-[url('/images/black_gold_pattern.png')] opacity-20 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                <div className="relative w-full max-w-[1500px] mx-auto h-full flex flex-col-reverse md:flex-row">
                    {/* Mobile Heading (Absolute) */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-2 left-0 right-0 z-10 text-5xl font-serif text-primary md:hidden drop-shadow-md p-6"
                    >
                        Our Most <br />
                        <span className="text-white">Beloved Dishes</span>
                    </motion.h2>

                    {/* Left Panel - Text */}
                    <div className="w-full md:w-1/2 h-[45%] md:h-full flex items-center p-6 md:p-12 relative z-40">
                        <div className="relative max-w-lg w-full flex flex-col h-full md:justify-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="hidden md:block text-7xl font-serif text-primary mb-8"
                            >
                                Our Most <br className="hidden md:block" />
                                <span className="text-white">Beloved Dishes</span>
                            </motion.h2>

                            <div className="relative flex-grow md:flex-grow-0 md:h-[600px]">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20, pointerEvents: 'none' }}
                                        animate={{
                                            opacity: activeIndex === index ? 1 : 0,
                                            x: activeIndex === index ? 0 : -20,
                                            pointerEvents: activeIndex === index ? 'auto' : 'none'
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute top-0 left-0 w-full h-full flex flex-col justify-evenly"
                                    >
                                        <h3 className="-mt-12 md:mt-0 text-6xl md:text-8xl font-great-vibes text-white mb-2 md:mb-4">{item.name}</h3>
                                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Review Section */}
                                        <Card className="mt-2 p-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl relative overflow-hidden min-h-fit">
                                            <CardContent className="p-3 md:p-6 md:h-auto flex flex-col justify-between">
                                                <div className="flex gap-1 text-primary mb-2 md:mb-3">
                                                    {[...Array(item.review.rating)].map((_, i) => (
                                                        <Star key={i} size={14} fill="currentColor" className="md:w-4 md:h-4" />
                                                    ))}
                                                </div>
                                                <p className="text-gray-300 italic mb-2 md:mb-4 text-xs md:text-base line-clamp-3 md:line-clamp-none">
                                                    {item.review.text}
                                                </p>
                                                <div className="flex flex-col gap-1 text-primary md:mb-3">
                                                    <p className="font-serif text-xs md:text-sm">— {item.review.author}</p>
                                                    <p className="font-serif text-[10px] md:text-xs">{item.review.source}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <Button
                                    variant="link"
                                    onClick={onOpenMenu}
                                    className="text-primary border-b border-primary p-0 pb-1 h-auto rounded-none hover:text-white hover:border-white hover:no-underline transition-colors text-sm md:text-base font-normal"
                                >
                                    View Full Menu
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Images */}
                    <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden flex items-center justify-center -mb-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-20"
                                initial={{ opacity: 0, y: 100 }}
                                animate={{
                                    opacity: activeIndex === index ? 1 : 0,
                                    y: activeIndex === index ? 0 :
                                        index < activeIndex ? -100 : 100, // Slide up if passed, slide down if coming
                                    scale: activeIndex === index ? 1 : 0.8
                                }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            >
                                <div className="relative w-[260px] h-[260px] md:w-[600px] md:h-[600px] flex items-center justify-center">

                                    {/* Visual Plate/Border Background (Behind) */}
                                    <div className="absolute inset-0 m-auto w-[260px] h-[260px] md:w-[500px] md:h-[500px] xl:w-[600px] xl:h-[600px] rounded-full bg-black/40 border-[4px] md:border-[6px] border-primary/80 shadow-2xl backdrop-blur-sm blur-[2px] z-0" />

                                    {/* Glowing background behind image */}
                                    <div className="absolute inset-0 m-auto bg-primary/20 blur-[30px] md:blur-[40px] w-[240px] h-[240px] md:w-[500px] md:h-[500px] xl:w-[600px] xl:h-[600px] rounded-full z-0" />

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[135%] w-[135%] max-w-none z-30 object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </motion.div>
                        ))}

                        {/* Progress Indicators */}
                        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-4 z-20">
                            {items.map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    animate={{
                                        height: activeIndex === idx ? 24 : 6,
                                        backgroundColor: activeIndex === idx ? '#fbbf24' : '#ffffff20'
                                    }}
                                    className="w-1 rounded-full transition-all duration-300"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
