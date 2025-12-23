'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from "@/app/context/cart-context";
import Stepper, { Step } from '@/components/ui/stepper';
import StripeWrapper from '@/components/checkout/StripeWrapper';

export default function CheckoutPage() {
    const { cart, getCartTotal } = useCart();

    const [activeStep, setActiveStep] = useState(1);

    // Contact State
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    // const finalDeliveryFee = 0; // Removed delivery fee
    const total = subtotal + tax;

    // Validation Logic
    // Step 1 is always valid as it's just "Pickup" (implicit) or simpler flow
    // Modify steps: Step 1 can be Contact Info now since we ONLY do pickup
    const isContactValid = contact.firstName &&
        contact.lastName &&
        contact.email &&
        contact.phone.length === 14;

    let isNextDisabled = false;
    if (activeStep === 1) isNextDisabled = !isContactValid;

    const handleFinalStep = () => {
        // Construct Order Data
        const orderData = {
            type: 'pickup',
            items: cart,
            totals: {
                subtotal,
                tax,
                total
            },
            customer: contact,
            deliveryDetails: null
        };

        console.log("Order Placed:", orderData);
        alert("Order Placed Successfully! (Demo)\nCheck console for payload details.");
        // Reset or redirect logic here
    };

    return (
        <main className="min-h-screen bg-white relative font-outfit">
            {/* Header / Nav */}
            <div className="border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <Link
                        href="/order"
                        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Menu
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8 mt-12">
                    <h1 className="text-3xl md:text-4xl font-serif text-text mb-2">Checkout</h1>
                    <p className="text-text-muted">Complete your pickup order details below</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Stepper (Takes 2 cols) */}
                    <div className="w-full lg:w-2/3">
                        <Stepper
                            initialStep={1}
                            onStepChange={setActiveStep}
                            onFinalStepCompleted={handleFinalStep}
                            isNextDisabled={!!isNextDisabled}
                            hideNextButton={activeStep === 2}
                            backButtonText="Previous"
                            nextButtonText="Continue"
                        >
                            <Step>
                                <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="space-y-2 flex-1">
                                            <label className="text-sm font-medium text-text-muted">First Name</label>
                                            <input
                                                type="text"
                                                value={contact.firstName}
                                                onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                                                className="w-full p-3 rounded-lg border border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <label className="text-sm font-medium text-text-muted">Last Name</label>
                                            <input
                                                type="text"
                                                value={contact.lastName}
                                                onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                                                className="w-full p-3 rounded-lg border border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Email</label>
                                        <input
                                            type="email"
                                            value={contact.email}
                                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                            className="w-full p-3 rounded-lg border border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Phone</label>
                                        <input
                                            type="tel"
                                            value={contact.phone}
                                            onChange={(e) => {
                                                const input = e.target.value.replace(/\D/g, '').substring(0, 10);
                                                let formatted = input;
                                                if (input.length > 6) {
                                                    formatted = `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6)}`;
                                                } else if (input.length > 3) {
                                                    formatted = `(${input.substring(0, 3)}) ${input.substring(3)}`;
                                                } else if (input.length > 0) {
                                                    formatted = `(${input}`;
                                                }
                                                setContact({ ...contact, phone: formatted });
                                            }}
                                            className="w-full p-3 rounded-lg border border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                            placeholder="(555) 555-5555"
                                        />
                                    </div>
                                </div>
                            </Step>

                            <Step>
                                <h2 className="text-xl font-medium mb-6">Payment Details</h2>
                                <StripeWrapper amount={total} onSuccess={handleFinalStep} />
                            </Step>
                        </Stepper>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-24">
                            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 shadow-sm">
                                <h3 className="text-xl font-medium mb-6">Order Summary</h3>

                                {cart.length === 0 ? (
                                    <div className="text-center py-8 text-text-muted">
                                        <p>Your cart is empty.</p>
                                        <Link href="/order" className="text-primary font-bold hover:underline mt-2 inline-block">
                                            Browse Menu
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4 text-sm max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                                        {cart.map((item) => (
                                            <div key={item.uniqueId} className="flex justify-between items-start pb-4 border-b border-zinc-200 last:border-0 last:pb-0">
                                                <div className="flex-1 pr-4">
                                                    <p className="font-medium">{item.menuItem.name}</p>
                                                    <div className="text-xs text-text-muted mt-1 space-y-0.5">
                                                        {item.customization?.spiceLevel && (
                                                            <p>Spice: {item.customization.spiceLevel}</p>
                                                        )}
                                                        {item.customization?.instructions && (
                                                            <p className="italic">"{item.customization.instructions}"</p>
                                                        )}
                                                    </div>
                                                    <p className="text-text-muted text-xs mt-1">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="font-medium">
                                                    ${(parseFloat(item.menuItem.price.replace('$', '')) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 space-y-2 pt-4 border-t border-zinc-200">
                                    <div className="flex justify-between text-text-muted">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-text-muted">
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-xl font-bold text-primary pt-4 border-t border-zinc-200">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
