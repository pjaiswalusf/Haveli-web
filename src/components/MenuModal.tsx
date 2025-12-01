import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuImages = [
  //   "/images/menu-page-1.png",
  //   "/images/menu-page-2.png",
  "/images/menu1.jpeg",
  "/images/menu2.jpeg"
];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]); // Added currentIndex dependency

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % menuImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + menuImages.length) % menuImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/90 z-[1000] flex items-center justify-center backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-[90%] max-w-[1000px] h-[90vh] flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-20 bg-black/50 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center transition-all hover:bg-primary hover:text-black md:-top-4 md:-right-16 md:z-10 md:bg-white/10"
              onClick={onClose}
            >
              <X size={24} />
            </button>

            <button
              className="absolute top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all z-5 hover:bg-primary hover:text-black md:w-[50px] md:h-[50px] md:bg-white/10 left-2 md:-left-[70px]"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>

            <div
              className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={menuImages[currentIndex]}
                  alt={`Menu Page ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, x: 20, scale: 1 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: isZoomed ? 2 : 1,
                  }}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  }}
                  exit={{ opacity: 0, x: -20, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            <button
              className="absolute top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all z-5 hover:bg-primary hover:text-black md:w-[50px] md:h-[50px] md:bg-white/10 right-2 md:-right-[70px]"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
              {menuImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full bg-white/30 cursor-pointer transition-all ${index === currentIndex ? 'bg-primary scale-125' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
