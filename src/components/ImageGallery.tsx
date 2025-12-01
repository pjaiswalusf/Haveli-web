import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = Array.from({ length: 26 }, (_, i) => `/images/carousel/${i + 1}.jpg`);

function GalleryRow({ images, direction = "left", speed = 150 }: { images: string[], direction?: "left" | "right", speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [0, -speed] : [-speed, 0]
  );

  return (
    <div ref={ref} className="flex overflow-hidden mb-8">
      <motion.div
        style={{ x }}
        className="flex gap-8 px-4"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={`relative w-72 h-72 flex-shrink-0 overflow-hidden rounded-3xl ${i % 2 === 0 ? 'rotate-3' : '-rotate-2'} hover:rotate-0 transition-transform duration-500`}
          >
            <img
              src={src}
              alt={`Gallery image ${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ImageGallery() {
  return (
    <section className="py-24 bg-bg overflow-hidden">
      <div className="mb-24 text-center relative z-10">
        <h2 className="text-5xl 2xl:text-7xl font-serif text-primary mb-4">A Glimpse of Haveli</h2>
        <p className="text-text-muted 2xl:text-lg">Immerse yourself in our ambiance and culinary delights.</p>
      </div>

      <div className="flex flex-col -rotate-1 scale-105">
        <GalleryRow images={[...images, ...images]} direction="left" speed={200} />
        <GalleryRow images={[...images].reverse()} direction="right" speed={250} />
        <GalleryRow images={[...images, ...images]} direction="left" speed={180} />
      </div>
    </section>
  );
}
