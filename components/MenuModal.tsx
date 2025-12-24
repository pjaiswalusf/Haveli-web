'use client';
import { useState, MouseEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
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
    // Handle Escape key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Prevent scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                    onClick={(e) => {
                        // Close if clicking the background backdrop (not the image itself)
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={32} />
                    </button>

                    <div className="w-full h-full p-4 md:p-10 flex items-center justify-center pointer-events-none">
                        <Carousel className="w-full h-full max-w-[95vw] pointer-events-auto [&_[data-slot=carousel-content]]:h-full">
                            <CarouselContent className="h-full">
                                {menuImages.map((src, index) => (
                                    <CarouselItem key={index} className="h-full flex items-center justify-center">
                                        <ZoomableImage src={src} alt={`Menu Page ${index + 1}`} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 md:left-4 bg-white/10 border-none text-white hover:bg-primary hover:text-black hover:border-none" />
                            <CarouselNext className="right-2 md:right-4 bg-white/10 border-none text-white hover:bg-primary hover:text-black hover:border-none" />
                        </Carousel>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    const toggleZoom = (e: MouseEvent<HTMLDivElement>) => {
        // Build initial position on click so it doesn't jump
        if (!isZoomed) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMousePosition({ x, y });
        }
        setIsZoomed(!isZoomed);
    };

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onMouseLeave={() => setIsZoomed(false)}
        >
            <motion.img
                src={src}
                alt={alt}
                className={`max-w-full max-h-full object-contain transition-cursor ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={toggleZoom}
                onMouseMove={handleMouseMove}
                animate={{
                    scale: isZoomed ? 2 : 1,
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
        </div>
    );
}
