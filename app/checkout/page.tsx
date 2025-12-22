'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJsApiLoader } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Loader2, AlertCircle, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCart } from "@/app/context/cart-context";
import Stepper, { Step } from '@/components/ui/stepper';

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <div className="w-full h-[300px] bg-zinc-100 animate-pulse rounded-xl flex items-center justify-center text-zinc-400">Loading Map...</div>
});

const STORE_COORDS = { lat: 28.064132, lng: -82.505322 }; // Haveli Indian Kitchen (Precise location)
const MAX_DELIVERY_RADIUS = 15; // miles
const DELIVERY_BASE_FEE = 5; // $5 base fee
const DELIVERY_BASE_RADIUS = 5; // miles included in base fee
const DELIVERY_FEE_PER_MILE = 1.5; // $1.50 per extra mile

export default function CheckoutPage() {
    const { cart, getCartTotal } = useCart();

    const [activeStep, setActiveStep] = useState(1);

    // Order Type State
    const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');

    // Address State
    const [address, setAddress] = useState("");
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [locationCoords, setLocationCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [deliveryError, setDeliveryError] = useState("");
    const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [isAddressVerified, setIsAddressVerified] = useState(false);

    // Contact State
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    const finalDeliveryFee = orderType === 'delivery' ? deliveryFee : 0;
    const total = subtotal + tax + finalDeliveryFee;

    // Debounce utility
    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Google Maps Loader
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: ['places']
    });

    const searchAddress = async (query: string) => {
        if (!query || query.length < 3 || !isLoaded) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            const service = new window.google.maps.places.AutocompleteService();
            const request = {
                input: query,
                componentRestrictions: { country: 'us' },
                location: new window.google.maps.LatLng(STORE_COORDS.lat, STORE_COORDS.lng),
                radius: 30000, // 30km bias
            };

            service.getPlacePredictions(request, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setSuggestions(predictions.map(p => ({
                        display_name: p.description,
                        place_id: p.place_id,
                        structured_formatting: p.structured_formatting
                    })));
                } else {
                    setSuggestions([]);
                }
                setIsSearching(false);
            });
        } catch (error) {
            console.error("Search failed:", error);
            setIsSearching(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce(searchAddress, 500), [isLoaded]);

    const selectAddress = (item: any) => {
        setAddress(item.display_name);
        setSuggestions([]);

        if (!isLoaded) return;

        // Get details (lat/lng) for the selected place
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId: item.place_id }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const location = results[0].geometry.location;
                const lat = location.lat();
                const lng = location.lng();

                setLocationCoords({ lat, lng });
                verifyDelivery(lat, lng);
            } else {
                setDeliveryError("Failed to get location details.");
            }
        });
    };

    const verifyDelivery = (destLat: number, destLng: number) => {
        setIsCalculating(true);
        setDeliveryError("");
        setDeliveryDistance(null);
        setIsAddressVerified(false);
        setDeliveryFee(0);

        try {
            const distance = getDistanceFromLatLonInMiles(
                STORE_COORDS.lat,
                STORE_COORDS.lng,
                destLat,
                destLng
            );

            setDeliveryDistance(distance);

            let fee = DELIVERY_BASE_FEE;
            if (distance > DELIVERY_BASE_RADIUS) {
                fee += (distance - DELIVERY_BASE_RADIUS) * DELIVERY_FEE_PER_MILE;
            }

            if (distance > MAX_DELIVERY_RADIUS) {
                setDeliveryError(`Sorry, we only deliver within ${MAX_DELIVERY_RADIUS} miles.`);
                setDeliveryFee(0);
            } else {
                setDeliveryFee(Math.round(fee * 100) / 100);
                setIsAddressVerified(true);
            }
        } catch (error) {
            setDeliveryError("Failed to calculate delivery.");
        } finally {
            setIsCalculating(false);
        }
    };

    function getDistanceFromLatLonInMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
        var R = 3959;
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }

    // Validation Logic
    const isStep1Valid = orderType === 'pickup' || (orderType === 'delivery' && isAddressVerified);
    const isStep2Valid = contact.firstName && contact.lastName && contact.email && contact.phone;

    let isNextDisabled = false;
    if (activeStep === 1) isNextDisabled = !isStep1Valid;
    if (activeStep === 2) isNextDisabled = !isStep2Valid; // Use !isStep2Valid to enforce validation, or false for loose validation. Enforce helps UX.

    const handleFinalStep = () => {
        // Construct Order Data
        const orderData = {
            type: orderType,
            items: cart,
            totals: {
                subtotal,
                tax,
                deliveryFee: finalDeliveryFee,
                total
            },
            customer: contact,
            // Critical: Include exact coordinates from the pin
            deliveryDetails: orderType === 'delivery' ? {
                address: address,
                coordinates: locationCoords, // This ensures we have the pin's exact location
                isVerified: isAddressVerified
            } : null
        };

        console.log("Order Placed:", orderData);
        alert("Order Placed Successfully! (Demo)\nCheck console for payload details including exact coordinates.");
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
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-serif text-text mb-2">Checkout</h1>
                    <p className="text-text-muted">Complete your order details below</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Stepper (Takes 2 cols) */}
                    <div className="lg:col-span-2">
                        <Stepper
                            initialStep={1}
                            onStepChange={setActiveStep}
                            onFinalStepCompleted={handleFinalStep}
                            isNextDisabled={!!isNextDisabled}
                            backButtonText="Previous"
                            nextButtonText="Continue"
                        >
                            <Step>
                                <h2 className="text-xl font-medium mb-6">How would you like your order?</h2>
                                <div className="space-y-6">
                                    <div className="bg-zinc-100/50 p-1.5 rounded-xl flex gap-1 border border-zinc-200">
                                        <button
                                            onClick={() => { setOrderType('pickup'); setDeliveryError(''); }}
                                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg text-sm font-medium transition-all duration-200 ${orderType === 'pickup'
                                                ? 'bg-white text-primary shadow-sm border border-zinc-200/50'
                                                : 'text-text-muted hover:text-text hover:bg-white/50'
                                                }`}
                                        >
                                            <ShoppingBag className="w-5 h-5" />
                                            Pickup
                                        </button>
                                        <button
                                            onClick={() => setOrderType('delivery')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg text-sm font-medium transition-all duration-200 ${orderType === 'delivery'
                                                ? 'bg-white text-primary shadow-sm border border-zinc-200/50'
                                                : 'text-text-muted hover:text-text hover:bg-white/50'
                                                }`}
                                        >
                                            <Truck className="w-5 h-5" />
                                            Delivery
                                        </button>
                                    </div>

                                    <AnimatePresence mode="popLayout">
                                        {orderType === 'delivery' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                animate={{ opacity: 1, height: 'auto', transitionEnd: { overflow: 'visible' } }}
                                                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                            >
                                                <div className="space-y-4 pt-2">
                                                    <label className="text-sm font-medium text-text-muted">Delivery Address</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={address}
                                                            onChange={(e) => {
                                                                setAddress(e.target.value);
                                                                setIsAddressVerified(false);
                                                                setDeliveryDistance(null);
                                                                debouncedSearch(e.target.value);
                                                            }}
                                                            className="w-full p-3 rounded-lg border border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                            placeholder="Start typing your address..."
                                                        />
                                                        {isSearching && (
                                                            <div className="absolute right-3 top-3">
                                                                <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                                                            </div>
                                                        )}

                                                        {suggestions.length > 0 && !isAddressVerified && (
                                                            <div className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-y-auto">
                                                                {suggestions.map((suggestion: any, index: number) => (
                                                                    <button
                                                                        key={index}
                                                                        onClick={() => selectAddress(suggestion)}
                                                                        className="w-full text-left px-4 py-3 hover:bg-zinc-50 text-sm border-b border-zinc-100 last:border-0 transition-colors flex items-start gap-2"
                                                                    >
                                                                        <MapPin className="w-4 h-4 mt-0.5 text-zinc-400 flex-shrink-0" />
                                                                        <span className="line-clamp-2">{suggestion.display_name}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {deliveryError && (
                                                        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                                                            <AlertCircle className="w-4 h-4" /> {deliveryError}
                                                        </div>
                                                    )}

                                                    {isAddressVerified && deliveryDistance !== null && (
                                                        <div className="space-y-4">
                                                            <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
                                                                <div className="flex items-start gap-3">
                                                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                                                                    <div>
                                                                        <p className="text-green-800 font-medium">Delivery Available!</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="h-[300px] w-full rounded-xl overflow-hidden border border-zinc-200 relative z-0">
                                                                {locationCoords && (
                                                                    <Map
                                                                        storeLocation={STORE_COORDS}
                                                                        deliveryLocation={locationCoords}
                                                                        onLocationSelect={(lat, lng) => {
                                                                            setLocationCoords({ lat, lng });
                                                                            verifyDelivery(lat, lng);

                                                                            // Reverse geocode
                                                                            if (isLoaded) {
                                                                                const geocoder = new window.google.maps.Geocoder();
                                                                                geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                                                                                    if (status === 'OK' && results && results[0]) {
                                                                                        setAddress(results[0].formatted_address);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Step>

                            <Step>
                                <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">First Name</label>
                                            <input
                                                type="text"
                                                value={contact.firstName}
                                                onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                                                className="w-full p-3 rounded-lg border border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
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
                                <div className="p-8 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50 text-center">
                                    <p className="text-text-muted">Payment integration coming soon.</p>
                                    <p className="text-xs text-text-muted mt-2">You will not be charged yet.</p>
                                </div>
                            </Step>
                        </Stepper>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
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

                                    {orderType === 'delivery' && (
                                        <div className={`flex justify-between ${isAddressVerified ? 'text-text-muted' : 'text-text-muted/50'}`}>
                                            <span>Delivery Fee</span>
                                            <span>{isAddressVerified ? `$${deliveryFee.toFixed(2)}` : '--'}</span>
                                        </div>
                                    )}

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
