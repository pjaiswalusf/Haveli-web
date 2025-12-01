import { SiUbereats, SiDoordash } from "react-icons/si";
import { motion } from 'framer-motion';

export default function Order() {
  return (
    <section id="order" className="relative py-24 bg-[url('/images/black_gold_pattern.png')] bg-cover bg-center bg-fixed text-white h-[500px] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      <div className="container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl font-serif text-primary mb-12 md:text-6xl">Order Online</h2>
          <p className="text-gray-400 text-lg mb-12">
            Craving Haveli at home? Order your favorites for delivery or pickup through our partners.
          </p>

          <div className="flex flex-col gap-6 justify-center md:flex-row">
            <a
              href="https://www.ubereats.com/store/haveli-indian-kitchen/nt_3PBuyQ86A8eNPISQWzA"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1 min-w-[280px]"
            >
              <div className="w-12 h-12 bg-[#06C167] text-white rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                <SiUbereats />
              </div>
              <div className="text-left">
                <span className="block text-sm text-text-muted">Order via</span>
                <span className="block text-xl font-bold text-text">UberEats</span>
              </div>
            </a>

            <a
              href="https://www.doordash.com/store/haveli-indian-cuisine-greater-carrollwood-392636/15361158/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1 min-w-[280px]"
            >
              <div className="w-12 h-12 bg-[#FF3008] text-white rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                <SiDoordash />
              </div>
              <div className="text-left">
                <span className="block text-sm text-text-muted">Order via</span>
                <span className="block text-xl font-bold text-text">DoorDash</span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
