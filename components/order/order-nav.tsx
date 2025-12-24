'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, LayoutGrid, Search, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Category, categories } from "@/app/data/menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface OrderNavProps {
    activeCategory: Category;
    isScrolled: boolean;
    isCategorySheetOpen: boolean;
    setIsCategorySheetOpen: (open: boolean) => void;
    scrollToCategory: (category: Category) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function OrderNav({
    activeCategory,
    isScrolled,
    isCategorySheetOpen,
    setIsCategorySheetOpen,
    scrollToCategory,
    searchQuery,
    setSearchQuery
}: OrderNavProps) {
    const isSearching = searchQuery.length > 0;

    return (
        <>
            {/* Back Button - Dynamic visibility on mobile */}
            <Link
                href="/"
                className={cn(
                    "fixed top-3 left-4 md:left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-zinc-200 rounded-full text-text-muted hover:text-primary hover:border-primary/50 transition-all shadow-sm shadow-black/5 group",
                    isScrolled && "opacity-0 pointer-events-none"
                )}
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Home</span>
            </Link>

            <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm">
                <div className="max-w-8xl mx-auto px-4 h-16 flex items-center gap-4">
                    {/* Mobile Nav: Search + Category Selector */}
                    <div className="flex md:hidden items-center gap-2 w-full">
                        <AnimatePresence mode="wait">
                            {isScrolled && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <Link href="/" className="p-2 -ml-2 text-text-muted hover:text-primary transition-colors flex items-center">
                                        <ArrowLeft className="w-6 h-6" />
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex-1 relative flex items-center gap-2 min-w-0">
                            <div className="relative flex-1 min-w-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search menu..."
                                    className="w-full bg-zinc-50 border border-zinc-100 pl-9 pr-9 py-2 rounded-xl text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/5 outline-none transition-all placeholder:text-text-muted/60"
                                />
                                {isSearching && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {!isSearching && (
                                <button
                                    onClick={() => setIsCategorySheetOpen(true)}
                                    className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-xl text-primary active:scale-95 transition-all shrink-0 max-w-[40%]"
                                >
                                    <LayoutGrid className="w-4 h-4 shrink-0" />
                                    <span className="text-sm font-bold truncate">{activeCategory}</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Desktop Nav: Horizontal Tabs + Search */}
                    <div className="hidden md:flex flex-1 items-center justify-between gap-8 min-w-0">
                        <AnimatePresence mode="wait">
                            {isScrolled && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <Link href="/" className="p-2 -ml-2 text-text-muted hover:text-primary transition-colors flex items-center">
                                        <ArrowLeft className="w-6 h-6" />
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="flex-1 flex overflow-x-auto scrollbar-thin py-2 justify-start min-w-0">
                            <div className="flex gap-1 relative pt-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        id={`nav-${cat}`}
                                        onClick={() => {
                                            setSearchQuery("");
                                            scrollToCategory(cat);
                                        }}
                                        className={cn(
                                            "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 relative",
                                            activeCategory === cat && !isSearching ? "text-black" : "text-text-muted hover:bg-zinc-50"
                                        )}
                                    >
                                        <span className="relative z-10">{cat}</span>
                                        {activeCategory === cat && !isSearching && (
                                            <motion.div
                                                layoutId="activePill"
                                                className="absolute inset-0 bg-primary rounded-xl shadow-md shadow-primary/20"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-64 shrink-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search menu..."
                                className="w-full bg-zinc-50 border border-zinc-200 pl-9 pr-9 py-2 rounded-xl text-sm focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-text-muted/60"
                            />
                            {isSearching && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Category selection Sheet for Mobile */}
            <Sheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen}>
                <SheetContent side="bottom" className="bg-white rounded-t-3xl p-6 h-[80vh] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-2xl font-serif text-primary text-left">Jump to Category</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    scrollToCategory(cat);
                                    setIsCategorySheetOpen(false);
                                }}
                                className={cn(
                                    "p-4 rounded-2xl border text-left flex items-center justify-between transition-all",
                                    activeCategory === cat
                                        ? "bg-primary/10 border-primary text-primary ring-1 ring-primary/20"
                                        : "bg-white border-zinc-100 text-text-muted hover:border-primary/40"
                                )}
                            >
                                <span className="font-medium">{cat}</span>
                                {activeCategory === cat && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </button>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
