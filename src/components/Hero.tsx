import { motion } from 'framer-motion';
import { ArrowDown, Leaf } from 'lucide-react';
import { useMemo } from 'react';


interface HeroProps {
  onOpenMenu: () => void;
}

export default function Hero({ onOpenMenu }: HeroProps) {
  const leaves = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 30 - 10}%`,
    bottom: `${Math.random() * 20 - 10}%`,
    delay: 1 + Math.random() * 2,
    duration: 4 + Math.random() * 3,
    rotate: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
  })), []);
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-[url('/images/outside.jpg')] bg-cover bg-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2vh] after:bg-gradient-to-b after:from-transparent after:to-[var(--color-bg-alt)] after:z-5 after:pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-0 pointer-events-none backdrop-blur-xs"
      />

      {/* Lens Flare Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.1, 0.8],
            rotate: [0, 45, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-500/10 blur-[90px] mix-blend-screen"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-yellow-400/20 to-orange-400/5 blur-[70px] mix-blend-screen"
        />
      </div>

      {/* Blowing Leaves Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              rotate: leaf.rotate,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: "120vw",
              y: "-120vh",
              rotate: leaf.rotate + 360 + Math.random() * 180,
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              ease: "easeOut",
            }}
            className="absolute text-primary/30"
            style={{
              left: leaf.left,
              bottom: leaf.bottom,
              scale: leaf.scale,
            }}
          >
            <Leaf className="w-8 h-8" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="z-10 flex flex-col items-center gap-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="block text-primary text-sm tracking-[0.3em] mb-4 uppercase font-medium md:text-base"
        >
          Authentic Indian Cuisine
        </motion.span>

        {/* Haveli Text */}
        <div className="relative font-great-vibes w-full xl:h-[25vh] mx-auto h-28 -ml-4 xl:-ml-18 mt-12 xl:mt-24">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200">
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#d4af37" />
                {/* <stop offset="50%" stopColor="#ffffff" />
                <stop offset="75%" stopColor="#d4af37" /> */}
                <stop offset="85%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>
            </defs>
            {/* Stroke Animation */}
            {/* Stroke Animation */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-great-vibes text-[14rem] md:text-[16rem]"
              stroke="url(#gold-gradient)"
              strokeWidth="2"
              fill="transparent"
            >
              {"Haveli".split("").map((letter, i) => (
                <motion.tspan
                  key={i}
                  initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3,
                    delay: i === 0 ? 0 : 1.5 + (i * 0.2),
                    ease: "easeInOut",
                  }}
                >
                  {letter}
                </motion.tspan>
              ))}
            </text>
            {/* Fill Fade In */}
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-great-vibes text-[14rem] md:text-[16rem]"
              fill="url(#gold-gradient)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 3, ease: "easeOut" }}
            >
              Haveli
            </motion.text>
          </svg>
        </div>

        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="max-w-md mx-auto mb-10 text-gray-300 text-lg font-light leading-relaxed md:text-xl"
          >
            Experience the royal flavors of India in a modern, elegant setting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex flex-col gap-4 justify-center items-center md:flex-row"
          >
            <button
              onClick={onOpenMenu}
              className="py-3 px-8 bg-primary text-black font-medium rounded-full transition-colors min-w-[160px] hover:bg-white hover:text-black cursor-pointer"
            >
              View Menu
            </button>
            <a
              href="#order"
              className="py-3 px-8 bg-primary/10 backdrop-blur-xs border border-primary text-white font-medium rounded-full transition-colors min-w-[160px] hover:bg-primary hover:text-black"
            >
              Order Now
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce"
      >
        <ArrowDown className="text-white/50 w-6 h-6" />
      </motion.div>
    </section>
  );
}
