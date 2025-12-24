'use client';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkOpenStatus = () => {
            const now = new Date();
            // Create a date object shifted to EST
            const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
            const day = estTime.getDay(); // 0 = Sunday, 1 = Monday, ...
            const hours = estTime.getHours();
            const minutes = estTime.getMinutes();
            const currentMinutes = hours * 60 + minutes;

            // Tuesday (2) is closed
            if (day === 2) {
                setIsOpen(false);
                return;
            }

            // Hours: 11:30 AM - 3:00 PM (690 - 900)
            //        5:00 PM - 10:00 PM (1020 - 1320)
            const isLunch = currentMinutes >= 690 && currentMinutes < 900;
            const isDinner = currentMinutes >= 1020 && currentMinutes < 1320;

            setIsOpen(isLunch || isDinner);
        };

        checkOpenStatus();
        const interval = setInterval(checkOpenStatus, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <footer id="location" className="relative bg-bg-alt border-t border-gray-200 pt-20 pb-10 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(100%_50%_at_bottom,_var(--color-primary)_0%,_transparent_70%)] opacity-10 pointer-events-none" />
            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row gap-12 mb-16 max-w-6xl mx-auto justify-between items-center md:items-stretch">
                    {/* Logo */}
                    <div className="flex justify-center w-full md:w-64">
                        <Image
                            src="/images/logo.png"
                            alt="Haveli Indian Kitchen Logo"
                            width={256}
                            height={100}
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="hidden md:block w-px bg-primary self-stretch" />

                    {/* Contact Info */}
                    <div className='w-full md:w-2/5 flex flex-col items-center md:items-start'>
                        <h3 className="text-2xl font-serif text-primary mb-6">Visit Us</h3>
                        <ul className="list-none flex flex-col gap-4 text-gray-500 w-full max-w-xs md:max-w-none">
                            <li className="flex items-start gap-3 justify-center md:justify-start">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <span className="text-left">12908 N Dale Mabry Hwy,<br />Tampa, FL 33618</span>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                <span>+1 (813) 488-6294</span>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                <span>hello@havelikitchen.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className='w-full md:w-3/5'>
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                            <h3 className="text-2xl font-serif text-primary mb-0">Opening Hours</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${isOpen ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                {isOpen ? 'Open Now!' : 'Closed'}
                            </span>
                        </div>
                        <ul className="list-none flex flex-col gap-4 text-gray-500 w-full max-w-sm mx-auto md:max-w-none md:mx-0">
                            <li className="flex justify-between border-b border-gray-200 pb-2">
                                <span>Mon, Wed - Sun</span>
                                <div className="text-right">
                                    <span className="block">11:30 AM – 3:00 PM</span>
                                    <span className="block">5:00 PM – 10:00 PM</span>
                                </div>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 pb-2">
                                <span>Tuesday</span>
                                <span>Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Haveli Indian Kitchen. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        {/* <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
