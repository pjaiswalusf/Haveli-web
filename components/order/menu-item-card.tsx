'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/app/data/menu";

interface MenuItemCardProps {
    menuItem: MenuItem;
    quantity: number;
    onAdd: () => void;
    variants: any;
}

export function MenuItemCard({ menuItem, quantity, onAdd, variants }: MenuItemCardProps) {
    return (
        <motion.div
            variants={variants}
            className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex h-full"
        >
            {menuItem.image && (
                <div className="w-32 relative shrink-0 bg-zinc-50 border-r border-zinc-100">
                    <Image
                        src={menuItem.image}
                        alt={menuItem.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}
            <div className="p-4 flex flex-col h-full flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium text-text group-hover:text-primary transition-colors">
                        {menuItem.name}
                    </h3>
                    <span className="text-primary font-bold whitespace-nowrap ml-4">
                        {menuItem.price}
                    </span>
                </div>

                {menuItem.description && (
                    <p className="text-text-muted text-sm mb-4 transition-all">
                        {menuItem.description}
                    </p>
                )}

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-100">
                    <div className="flex gap-2">
                        {menuItem.isVegetarian && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-100">
                                Veg
                            </span>
                        )}
                        {menuItem.isSpicy && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-100">
                                Spicy
                            </span>
                        )}
                    </div>

                    {/* Add Button / Quantity Indicator */}
                    <div className="flex items-center gap-2">
                        {quantity > 0 && (
                            <span className="text-xs font-bold bg-zinc-100 px-2 py-1 rounded-full text-text animate-in fade-in">
                                {quantity} added
                            </span>
                        )}
                        <Button
                            size="icon"
                            className={`rounded-full transition-all duration-300 ${quantity > 0 ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-primary hover:text-black'}`}
                            onClick={onAdd}
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
