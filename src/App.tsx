// import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
// import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageGallery from './components/ImageGallery';
import MenuHighlights from './components/MenuHighlights';
import About from './components/About';
import Order from './components/Order';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import MenuModal from './components/MenuModal';
import Testimonials from './components/Testimonials';
// import Scene from './components/Scene';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-primary selection:text-black">
      <SmoothScroll />
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* 3D Background */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div> */}

      {/* Content */}
      <div className="relative z-10">
        {/* <Navbar /> */}
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

export default App;
