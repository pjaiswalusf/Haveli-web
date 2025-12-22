'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from "@/app/data/menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface MenuItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    menuItem: MenuItem | null;
    addToCart: (item: MenuItem, quantity: number, customization: any) => void;
}

export function MenuItemModal({ isOpen, onClose, menuItem, addToCart }: MenuItemModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [spiceLevel, setSpiceLevel] = useState('Mild');
    const [instructions, setInstructions] = useState('');

    // Reset state when modal opens with a new item
    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setSpiceLevel('Mild');
            setInstructions('');
        }
    }, [isOpen, menuItem]);

    if (!menuItem) return null;

    const handleAddToCart = () => {
        addToCart(menuItem, quantity, { spiceLevel, instructions });
        onClose();
    };

    const price = parseFloat(menuItem.price.replace('$', ''));
    const total = (price * quantity).toFixed(2);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-hidden bg-white text-text font-outfit">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-primary">{menuItem.name}</DialogTitle>
                    <DialogDescription className="text-text-muted">
                        {menuItem.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Spice Level Section */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-text">Spice Level</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {['Mild', 'Medium', 'Spicy', 'Extra Spicy'].map((level) => (
                                <div
                                    key={level}
                                    onClick={() => setSpiceLevel(level)}
                                    className={`cursor-pointer border rounded-lg p-3 text-center text-sm transition-all duration-200 ${spiceLevel === level
                                        ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                                        : 'border-zinc-200 text-text-muted hover:border-zinc-300'
                                        }`}
                                >
                                    {level}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-text">Special Instructions</h4>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="Add a note (e.g. No allergies, extra sauce)..."
                            className="w-full min-h-[100px] p-3 rounded-lg border border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none text-sm placeholder:text-zinc-400"
                        />
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                        <span className="font-medium text-text">Quantity</span>
                        <div className="flex items-center gap-4">
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 rounded-full border-zinc-300 hover:bg-zinc-100"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-bold w-4 text-center">{quantity}</span>
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 rounded-full border-zinc-300 hover:bg-zinc-100"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sticky bottom-0 bg-white pt-2 border-t border-zinc-100 mt-2">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12 text-lg"
                    >
                        Add to Cart - ${total}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
