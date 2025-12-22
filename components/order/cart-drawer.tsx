'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/app/data/menu";
import Link from "next/link";

interface CartDrawerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    cart: CartItem[];
    updateQuantity: (uniqueId: string, delta: number) => void;
    removeFromCart: (uniqueId: string) => void;
}

export function CartDrawer({ isOpen, setIsOpen, cart, updateQuantity, removeFromCart }: CartDrawerProps) {
    const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotalPrice = cart.reduce((sum, item) => {
        const price = parseFloat(item.menuItem.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);

    return (
        <>
            {/* Floating Cart Summary */}
            <AnimatePresence>
                {cartTotalItems > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
                    >
                        <div
                            onClick={() => setIsOpen(true)}
                            className="bg-primary text-black rounded-2xl shadow-xl shadow-black/20 p-4 flex items-center justify-between group cursor-pointer hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-black/20 p-2 rounded-xl">
                                    <ShoppingCart className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium opacity-80">{cartTotalItems} items added</p>
                                    <p className="text-xl font-bold">${cartTotalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="hover:bg-black/10 text-black font-bold flex items-center gap-2 pr-2"
                            >
                                View Cart
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="bg-white border-zinc-200 text-text w-full sm:max-w-md p-0 flex flex-col">
                    <SheetHeader className="p-6 border-b border-zinc-100">
                        <SheetTitle className="text-2xl font-serif text-primary">Your Order</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                <ShoppingCart className="w-12 h-12 opacity-20" />
                                <p>Your cart is empty</p>
                                <Button
                                    variant="outline"
                                    className="border-primary/20 text-primary hover:bg-primary/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Browse Menu
                                </Button>
                            </div>
                        ) : (
                            cart.map((item, index) => {
                                const itemTotal = parseFloat(item.menuItem.price.replace('$', '')) * item.quantity;

                                return (
                                    <React.Fragment key={item.uniqueId}>
                                        <div className="flex justify-between items-start group font-outfit">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-text">{item.menuItem.name}</h4>

                                                {/* Customizations Display */}
                                                <div className="text-xs text-text-muted mt-1 space-y-0.5">
                                                    {item.customization?.spiceLevel && (
                                                        <p>Spice: {item.customization.spiceLevel}</p>
                                                    )}
                                                    {item.customization?.instructions && (
                                                        <p className="italic">"{item.customization.instructions}"</p>
                                                    )}
                                                </div>

                                                <p className="text-sm text-text-muted mt-1">{item.menuItem.price} each</p>

                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.uniqueId, -1)}
                                                            className="p-1 hover:text-primary transition-colors text-text"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs font-bold min-w-[20px] text-center text-text">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.uniqueId, 1)}
                                                            className="p-1 hover:text-primary transition-colors text-text"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col h-full min-h-[80px] items-end justify-between">
                                                <p className="font-bold text-primary">${itemTotal.toFixed(2)}</p>
                                                <Button
                                                    variant="ghost_destructive"
                                                    onClick={() => removeFromCart(item.uniqueId)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        {index < cart.length - 1 && (
                                            <Separator className="bg-zinc-100" />
                                        )}
                                    </React.Fragment>
                                );
                            })
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 border-t border-zinc-100 bg-zinc-50 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-text-muted">
                                    <span>Subtotal</span>
                                    <span>${cartTotalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-muted">
                                    <span>Tax (estimated)</span>
                                    <span>${(cartTotalPrice * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-zinc-200">
                                    <span>Total</span>
                                    <span>${(cartTotalPrice * 1.08).toFixed(2)}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="w-full" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12 text-lg">
                                    Checkout
                                </Button>
                            </Link>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}
