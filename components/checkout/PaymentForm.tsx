'use client';

import React, { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';

interface PaymentFormProps {
    amount: number;
    onSuccess: (paymentIntentId: string) => void;
}

export default function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
                return_url: `${window.location.origin}/order-confirmation`,
            },
            redirect: 'if_required',
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (e.g., payment
            // details incomplete)
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message || "An unexpected error occurred.");
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment succeeded!
            onSuccess(paymentIntent.id);
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-sm text-text-muted">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Transactions are secure and encrypted.</span>
                </div>

                <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

                {message && (
                    <div className="p-3 mt-4 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
                        {message}
                    </div>
                )}
            </div>

            <Button
                disabled={isLoading || !stripe || !elements}
                className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 text-black rounded-lg transition-all"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                    </span>
                ) : (
                    `Pay $${amount.toFixed(2)}`
                )}
            </Button>
        </form>
    );
}
