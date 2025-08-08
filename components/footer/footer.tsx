import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone } from 'lucide-react';

type footerData = {
  title: string;
  items: { title: string; href: string }[];
};

type footerInfo = {
  subtitle: string;
  services: footerData;
  company: footerData;
};

export default function Footer({ footerInfo }: { footerInfo: footerInfo[] }) {
    const footerData = footerInfo[0];
    return (
        <footer className="bg-gradient-to-b from-background-secondary/35 to-background-secondary/30 text-main border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            {/* Scissors Icon */}
                            <div className="w-8 h-8 text-main">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                    <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-main">JL Barber & Ladyhair</h2>
                            </div>
                        </div>
                        <p className="text-main2 leading-relaxed mb-6 max-w-sm">
                            {footerData.subtitle}
                        </p>
                        
                        {/* Social Media */}
                        <div className="flex gap-4">
                            <Link 
                                href="https://www.instagram.com/jl_barber_ladyhair_bratislava/" 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-main hover:text-white group"
                            >
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link 
                                href="https://www.facebook.com/people/JL-Barber-Ladyhair-salon/61565918697661/" 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-main hover:text-white group"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h3 className="text-lg font-bold text-main mb-6 uppercase tracking-wide">
                            {footerData.services.title}
                        </h3>
                        <ul className="space-y-3">
                            {footerData.services.items.map((service, index) => (
                                <li key={index}>
                                    <Link 
                                        href="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9"
                                        className="text-main2 hover:text-main transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-main2 rounded-full mr-3 group-hover:bg-main transition-colors duration-300"></span>
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-lg font-bold text-main mb-6 uppercase tracking-wide">
                            {footerData.company.title}
                        </h3>
                        <ul className="space-y-3">
                            {footerData.company.items.map((company, index) => (
                                <li key={index}>
                                    <Link 
                                        href="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9"
                                        className="text-main2 hover:text-main transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-main2 rounded-full mr-3 group-hover:bg-main transition-colors duration-300"></span>
                                        {company.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-bold text-main mb-6 uppercase tracking-wide">
                            Kontakt
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-main mt-1 flex-shrink-0" />
                                <div className="text-main2">
                                    <p className="font-medium">Farského 18, 851 01</p>
                                    <p>Petržalka, Bratislava</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-main flex-shrink-0" />
                                <Link 
                                    href="tel:+421949599372"
                                    className="text-main2 hover:text-main transition-colors duration-300 font-medium"
                                >
                                    +421 949 599 372
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-300 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-main2">
                            © {new Date().getFullYear()} JL Barber Ladyhair. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="#" className="text-main2 hover:text-main transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-main2 hover:text-main transition-colors duration-300">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-main2 hover:text-main transition-colors duration-300">
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}