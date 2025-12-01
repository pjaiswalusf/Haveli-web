import { motion } from 'framer-motion';

const items = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken morsels simmered in a rich, creamy tomato sauce.",
    price: "$18",
    image: "/images/butter-chicken-new.png"
  },
  {
    id: 2,
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice cooked with marinated chicken and aromatic spices.",
    price: "$22",
    image: "/images/biryani-new.png"
  },
  {
    id: 3,
    name: "Garlic Naan",
    description: "Oven-baked flatbread topped with garlic and fresh cilantro.",
    price: "$5",
    image: "/images/naan.png"
  }
];

interface MenuHighlightsProps {
  onOpenMenu: () => void;
}

export default function MenuHighlights({ onOpenMenu }: MenuHighlightsProps) {
  return (
    <section id="menu" className="relative py-24 bg-[url('/images/black_gold_pattern.png')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-primary mb-4 md:text-5xl">Signature Dishes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A curated selection of our most beloved recipes, passed down through generations.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10 md:flex-row">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[450px] 2xl:h-[600px] flex-1 rounded-lg bg-gradient-to-br from-[#8a6e2f] via-[#fcd34d] to-[#8a6e2f] p-[1px] shadow-lg transition-transform duration-300"
            >
              <div className="flex flex-col h-full w-full overflow-hidden rounded-lg bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-white transition-colors group-hover:text-primary">
                      {item.name}
                    </h3>
                    {/* <span className="text-primary font-medium">{item.price}</span> */}
                  </div>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onOpenMenu}
            className="inline-block border-b border-primary text-primary pb-1 transition-all hover:text-white hover:border-white cursor-pointer"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
}

