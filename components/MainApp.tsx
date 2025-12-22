'use client';

import { useState } from 'react';
import Hero from './Hero';
import ImageGallery from './ImageGallery';
import MenuHighlights from './MenuHighlights';
import About from './About';
import Order from './Order';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import MenuModal from './MenuModal';
import Testimonials from './Testimonials';

export default function MainApp() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-bg font-outfit text-text selection:bg-primary selection:text-black">
            <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="relative z-10">
                <main>
                    <Hero onOpenMenu={() => setIsMenuOpen(true)} />
                    <ImageGallery />
                    <MenuHighlights onOpenMenu={() => setIsMenuOpen(true)} />
                    <About />
                    <Testimonials />
                    <Order />
                </main>
                <Footer />
            </div>
        </div>
    );
}
