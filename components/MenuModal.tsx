'use client';
import { useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel";

interface MenuModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuImages = [
    "/images/menu1.jpeg",
    "/images/menu2.jpeg"
];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [api, setApi] = useState<CarouselApi>();

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] h-[95vh] p-0 border-none bg-black/95 text-white [&>button]:text-white [&>button]:bg-white/10 [&>button]:hover:bg-white/20 [&>button]:top-4 [&>button]:right-4">
                <DialogTitle className="sr-only">Menu Gallery</DialogTitle>
                <DialogDescription className="sr-only">
                    Browse our menu pages
                </DialogDescription>

                <div className="w-full h-full flex items-center justify-center p-4">
                    <Carousel className="w-full h-full max-w-5xl" setApi={setApi}>
                        <CarouselContent className="h-full">
                            {menuImages.map((src, index) => (
                                <CarouselItem key={index} className="h-full flex items-center justify-center">
                                    <div
                                        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in"
                                        onMouseEnter={() => setIsZoomed(true)}
                                        onMouseLeave={() => setIsZoomed(false)}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <motion.img
                                            src={src}
                                            alt={`Menu Page ${index + 1}`}
                                            className="max-w-full max-h-full object-contain"
                                            animate={{
                                                scale: isZoomed ? 2 : 1,
                                                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                                            }}
                                            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 bg-white/10 border-none text-white hover:bg-primary hover:text-black hover:border-none" />
                        <CarouselNext className="right-4 bg-white/10 border-none text-white hover:bg-primary hover:text-black hover:border-none" />
                    </Carousel>
                </div>
            </DialogContent>
        </Dialog>
    );
}
