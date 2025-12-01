import { useState, useEffect } from 'react';
import { reviews } from '../data/reviews';
import { motion } from 'framer-motion';

const ReviewCard = ({ review, className = "", index }: { review: typeof reviews[0], className?: string, index: number }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!review.reviewImages || review.reviewImages.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % review.reviewImages!.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [review.reviewImages, isHovered]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-stone-100 flex flex-col min-h-[500px] ${className}`}
        >
            <div className="mb-6 flex text-secondary">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-stone-800" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            <div className="mb-6 relative">
                <p className="text-stone-600 italic leading-relaxed relative">
                    <span className="absolute -top-4 -left-3 text-6xl text-stone-200 font-serif opacity-50">"</span>
                    {review.text}
                </p>
            </div>

            {review.reviewImages && review.reviewImages.length > 0 && (
                <div
                    className="mb-6 rounded-lg overflow-hidden h-48 w-full relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {review.reviewImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Review food ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ))}

                    {/* Carousel Indicators */}
                    {review.reviewImages.length > 1 && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                            {review.reviewImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                                        ? 'bg-white w-3'
                                        : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center gap-4 pt-6 border-t border-stone-100 mt-auto">
                {review.image ? (
                    <img
                        src={review.image}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-secondary/20"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-xl font-bold">
                        {review.author.charAt(0)}
                    </div>
                )}
                <div>
                    <h3 className="font-serif text-primary text-lg font-medium">{review.author}</h3>
                    <p className="text-stone-400 text-xs uppercase tracking-wider">Verified Guest</p>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
    return (
        <section
            id="testimonials"
            className="py-24 relative overflow-hidden bg-white"
            style={{
                backgroundImage: `url('/images/testimonials-bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Gradient Mask for smooth blending with previous section */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/60 pointer-events-none"></div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-serif text-primary mb-4">Guest Experiences</h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mt-20">
                    {reviews.map((review, index) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            index={index}
                            className={index === 1 ? "lg:-mt-12" : ""}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;