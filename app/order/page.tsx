'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { menuItems, categories, Category, MenuItem, CartItem } from "@/app/data/menu";
import { OrderNav } from "@/components/order/order-nav";
import { MenuItemCard } from "@/components/order/menu-item-card";
import { MenuItemModal } from "@/components/order/menu-item-modal";
import { CartDrawer } from "@/components/order/cart-drawer";
import { UtensilsCrossed } from "lucide-react";

export default function OrderPage() {
    const [activeCategory, setActiveCategory] = useState<Category>("Appetizers");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const isManualScroll = useRef(false);

    // Modal State
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (item: MenuItem, quantity: number, customization: any) => {
        const newItem: CartItem = {
            uniqueId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            menuItem: item,
            quantity,
            customization
        };
        setCart(prev => [...prev, newItem]);
        setIsModalOpen(false);
    };

    const removeFromCart = (uniqueId: string) => {
        setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
    };

    const updateQuantity = (uniqueId: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.uniqueId === uniqueId) {
                    return { ...item, quantity: Math.max(0, item.quantity + delta) };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const openCustomizeModal = (item: MenuItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const getItemQuantity = (itemId: string) => {
        return cart
            .filter(item => item.menuItem.id === itemId)
            .reduce((sum, item) => sum + item.quantity, 0);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (isManualScroll.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id as Category);
                }
            });
        }, {
            rootMargin: "-120px 0px -80% 0px",
            threshold: 0
        });

        categories.forEach((cat) => {
            const element = document.getElementById(cat);
            if (element) observer.observe(element);
        });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll active nav item into view
    useEffect(() => {
        const activeBtn = document.getElementById(`nav-${activeCategory}`);
        if (activeBtn) {
            activeBtn.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [activeCategory]);

    // Smooth scroll to category
    const scrollToCategory = (category: Category) => {
        isManualScroll.current = true;
        setActiveCategory(category);
        const element = document.getElementById(category);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky header
            window.scrollTo({ top: y, behavior: 'smooth' });

            setTimeout(() => {
                isManualScroll.current = false;
            }, 800);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className="min-h-screen bg-white relative font-outfit">
            {/* Header */}
            <header className="relative z-10 pt-32 pb-16 text-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[url('/images/white_gold_pattern.png')] bg-cover bg-center" />
                <div className="container relative z-10 mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-8xl text-text mb-6 relative inline-block font-serif"
                    >
                        Order Online
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-text-muted max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed mt-4"
                    >
                        Discover the essence of Haveli—crafted with passion and delivered with care to your sanctuary.
                    </motion.p>
                </div>
            </header>

            <OrderNav
                activeCategory={activeCategory}
                isScrolled={isScrolled}
                isCategorySheetOpen={isCategorySheetOpen}
                setIsCategorySheetOpen={setIsCategorySheetOpen}
                scrollToCategory={scrollToCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Menu Content */}
            <div className="mx-auto px-4 relative z-10 max-w-7xl mt-12 pb-32">
                {searchQuery !== "" ? (
                    <div className="space-y-12">
                        <div className="flex items-center gap-4 border-b border-primary/10 pb-6 mb-12">
                            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                                <UtensilsCrossed className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif text-text">Search Results</h2>
                                <p className="text-text-muted">Showing items matching "{searchQuery}"</p>
                            </div>
                        </div>

                        {(() => {
                            const filteredItems = menuItems.filter(item =>
                                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
                            );

                            if (filteredItems.length === 0) {
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-20"
                                    >
                                        <div className="bg-zinc-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <UtensilsCrossed className="w-10 h-10 text-text-muted" />
                                        </div>
                                        <h3 className="text-2xl font-serif text-text mb-2">No items found</h3>
                                        <p className="text-text-muted">We couldn't find anything matching "{searchQuery}"</p>
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="mt-6 text-primary font-medium hover:underline"
                                        >
                                            Clear search
                                        </button>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {filteredItems.map((menuItem) => (
                                        <MenuItemCard
                                            key={menuItem.id}
                                            menuItem={menuItem}
                                            quantity={getItemQuantity(menuItem.id)}
                                            onAdd={() => openCustomizeModal(menuItem)}
                                            variants={itemVariants}
                                        />
                                    ))}
                                </motion.div>
                            );
                        })()}
                    </div>
                ) : (
                    categories.map((cat) => {
                        const items = menuItems.filter(item => item.category === cat);
                        if (items.length === 0) return null;

                        return (
                            <section key={cat} id={cat} className="mb-20 scroll-mt-32">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="text-3xl md:text-4xl font-serif text-primary mb-8 border-b border-primary/20 pb-4 inline-block"
                                >
                                    {cat}
                                </motion.h2>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {items.map((menuItem) => (
                                        <MenuItemCard
                                            key={menuItem.id}
                                            menuItem={menuItem}
                                            quantity={getItemQuantity(menuItem.id)}
                                            onAdd={() => openCustomizeModal(menuItem)}
                                            variants={itemVariants}
                                        />
                                    ))}
                                </motion.div>
                            </section>
                        );
                    })
                )}
            </div>

            <CartDrawer
                isOpen={isCartOpen}
                setIsOpen={setIsCartOpen}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
            />

            <MenuItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                menuItem={selectedItem}
                addToCart={addToCart}
            />
        </main>
    );
}
