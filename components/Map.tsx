'use client';

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

interface MapProps {
    storeLocation: { lat: number; lng: number };
    deliveryLocation: { lat: number; lng: number } | null;
    onLocationSelect?: (lat: number, lng: number) => void;
}

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.75rem'
};

const LIBRARIES: ("places" | "geometry" | "drawing" | "visualization")[] = ['places'];

export default function Map({ storeLocation, deliveryLocation, onLocationSelect }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: LIBRARIES
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    useEffect(() => {
        if (!map) return;

        if (deliveryLocation) {
            map.panTo(deliveryLocation);
            map.setZoom(18);
        } else {
            map.panTo(storeLocation);
            map.setZoom(13);
        }
    }, [map, storeLocation, deliveryLocation]);

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (onLocationSelect && e.latLng) {
            onLocationSelect(e.latLng.lat(), e.latLng.lng());
        }
    };

    const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
        if (onLocationSelect && e.latLng) {
            onLocationSelect(e.latLng.lat(), e.latLng.lng());
        }
    };

    const options = useMemo(() => ({
        disableDefaultUI: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        clickableIcons: false
    }), []);

    if (!isLoaded) {
        return (
            <div className="w-full h-full min-h-[300px] bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 animate-pulse">
                Loading Google Maps...
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[300px] bg-zinc-100 rounded-xl overflow-hidden relative isolate">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={deliveryLocation || storeLocation}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
                options={options}
            >
                {deliveryLocation && (
                    <MarkerF
                        position={deliveryLocation}
                        draggable={!!onLocationSelect}
                        onDragEnd={handleMarkerDragEnd}
                        title="Delivery Location"
                        icon={{
                            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                            fillColor: "#d4af37", // Primary Orange
                            fillOpacity: 1,
                            strokeWeight: 1,
                            strokeColor: "#ffffff",
                            scale: 2,
                            anchor: new window.google.maps.Point(12, 22),
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
}