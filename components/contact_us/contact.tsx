'use client'
import { getGoogleReviews } from '@/lib/googleReviews';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MapPin, Phone, Star, Calendar } from 'lucide-react';
import GoogleMap from '../map_component';

type ContactInfo = {
    title: string;
    subtitle: string;
    bookingButton: string;
    addressButton: string;
}

export default function ContactUs({ contactInfo }: { contactInfo: ContactInfo[] }) {
    const [reviewStats, setReviewStats] = useState({
        totalReviews: 14,
        averageRating: 5.0
    });

    // useEffect(() => {
    //     async function fetchStats() {
    //         const stats = await getGoogleReviews();
    //         setReviewStats(stats);
    //     }
    //     fetchStats();
    // }, []);

    const addressData = contactInfo[0];

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id='contacts' className="min-h-screen bg-gradient-to-b from-background-secondary/35 to-background-secondary/30 flex items-center justify-center py-16 px-6">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair-display text-main mb-6 leading-tight">
                            {addressData.title}
                        </h1>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-lg md:text-xl text-main2 leading-relaxed mb-4">
                                {addressData.subtitle}
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Contact Card */}
                    <motion.div
                        variants={itemVariants}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                            {/* Business Header */}
                            <div className="p-8 pb-6">
                                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                                        <h3 className="text-2xl font-bold text-main mb-2">
                                            JL Barber & Ladyhair Salon
                                        </h3>
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                            <div className="flex items-center gap-2 text-main2 text-sm">
                                            
                                            <Calendar className="w-4 h-4" />
                                            <span>EST. 2018</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="text-center sm:text-right">
                                        <div className="flex items-center gap-1 rounded-full p-2 bg-main/10">
                                                <Star className="w-5 h-5 text-main fill-current" />
                                                <span className="font-bold text-main">
                                                    {reviewStats.averageRating.toFixed(1)}
                                                </span>
                                                <span className="text-main2 font-semibold">
                                                    ({reviewStats.totalReviews})
                                                </span>
                                            </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 text-main2">
                                        <MapPin className="w-5 h-5 text-main flex-shrink-0" />
                                        <span>Farského 18, 851 01 Bratislava, Slovensko</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-main2">
                                        <Phone className="w-5 h-5 text-main flex-shrink-0" />
                                        <span>+421 949 599 372</span>
                                    </div>
                                </div>
                            </div>

                            {/* Map Section Placeholder */}
                             <div className="px-8 pb-6">
                                <GoogleMap className="w-full h-64 rounded-2xl shadow-lg" />
                            </div>

                            {/* Action Buttons */}
                            <div className="p-8 pt-0">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.div 
                                        className="flex-1"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9"
                                            className="block"
                                        >
                                            <Button 
                                                className="w-full bg-main hover:bg-main1 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                            >
                                                <Calendar className="w-5 h-5 mr-2" />
                                                {addressData.bookingButton}
                                            </Button>
                                        </Link>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="flex-1"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button 
                                            variant="outline"
                                            className="w-full border-2 border-main text-main hover:bg-main hover:text-white py-3 rounded-full font-semibold text-lg transition-all duration-300"
                                        >
                                            <MapPin className="w-5 h-5 mr-2" />
                                            {addressData.addressButton}
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}