'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { Loader2 } from 'lucide-react';

// Make sure to add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface StripeWrapperProps {
    amount: number;
    onSuccess: () => void;
}

export default function StripeWrapper({ amount, onSuccess }: StripeWrapperProps) {
    const [clientSecret, setClientSecret] = useState("");
    const [loadingSecret, setLoadingSecret] = useState(true);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // TODO: Replace with your actual backend endpoint
        const fetchPaymentIntent = async () => {
            setLoadingSecret(true); // Ensure loading state is true initially

            try {
                const res = await fetch("/api/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount }),
                });

                if (!res.ok) throw new Error('Failed to init payment');

                const data = await res.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
            } finally {
                setLoadingSecret(false);
            }
        };

        fetchPaymentIntent();
    }, [amount]);

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#d4af37',
            colorBackground: '#ffffff',
            colorText: '#30313d',
        },
    };

    if (loadingSecret) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
                <p>Initializing Secure Payment...</p>
            </div>
        );
    }

    // Fallback if no specific proper key/backend is connected yet
    if (!clientSecret && !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return (
            <div className="p-6 border border-yellow-200 bg-yellow-50 rounded-xl text-yellow-800">
                <h3 className="font-bold mb-2">Stripe Configuration Needed</h3>
                <p className="text-sm mb-4">
                    To enable real payments, you need to:
                </p>
                <ol className="list-decimal list-inside text-sm space-y-1 mb-6">
                    <li>Add <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to your environment variables</li>
                    <li>Create an API route to generate a PaymentIntent and return a <code>clientSecret</code></li>
                </ol>

                <div className="pt-4 border-t border-yellow-200">
                    <p className="text-sm font-medium mb-2">Simulate Successful Payment (Demo Only)</p>
                    <button
                        onClick={onSuccess}
                        className="w-full bg-[#d4af37] hover:bg-[#b5952f] text-black font-medium py-3 rounded-lg transition-colors"
                    >
                        Demo: Complete Order
                    </button>
                </div>
            </div>
        );
    }

    // This handles the case where we might have a key but no backend yet (still can't render elements)
    if (!clientSecret) {
        return (
            <div className="p-6 border border-zinc-200 bg-zinc-50 rounded-xl text-center">
                <p className="text-text-muted mb-4">
                    Payment system connected, but unable to create transaction (Missing Backend).
                </p>
                <button
                    onClick={onSuccess}
                    className="bg-primary text-black px-6 py-2 rounded-lg font-medium"
                >
                    Simulate Payment Success
                </button>
            </div>
        );
    }

    return (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
            <PaymentForm amount={amount} onSuccess={(id) => { console.log("Success", id); onSuccess(); }} />
        </Elements>
    );
}
