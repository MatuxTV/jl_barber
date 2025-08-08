"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

type openingHours = {
  day: string;
  hours: string;
};

type openingInfo = {
  title: string;
  days: openingHours[];
  tip: string;
  bookingButton: string;
  subtitle: string;
  weekly: string;
};

export default function OpeningHours({
  openingHours,
}: {
  openingHours: openingInfo[];
}) {
  const openingData = openingHours[0];

  // Check if it's weekend (closed days)
  const isClosedDay = (hours: string) => {
    return hours.toLowerCase().includes("zatvorené") || hours.toLowerCase().includes("closed");
  };

  return (
    <section id="opening-hours" className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          {/* Header Section */}
          <div className="mb-16">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair-display text-main mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {openingData.title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-main2 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {openingData.subtitle}
            </motion.p>
          </div>

          {/* Opening Hours Card */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-main/10 to-main1/10 p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-6 h-6 text-main" />
                  <h2 className="text-2xl font-bold text-main">
                    {openingData.weekly}
                  </h2>
                </div>
              </div>

              {/* Hours List */}
              <div className="p-8">
                <div className="space-y-4">
                  {openingData.days.map((info, index) => (
                    <motion.div
                      key={`${index}`}
                      className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 ${
                        isClosedDay(info.hours)
                          ? "bg-red-50 border border-red-100"
                          : "bg-gray-50 hover:bg-main/5 border border-transparent hover:border-main/20"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <span className="font-semibold text-main text-lg">
                        {info.day}
                      </span>
                      <span
                        className={`font-bold text-lg ${
                          isClosedDay(info.hours)
                            ? "text-red-500"
                            : "text-main2"
                        }`}
                      >
                        {info.hours}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Booking Button */}
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <Link
                    href="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full bg-main hover:bg-main1 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        <Calendar className="w-6 h-6 mr-3" />
                        Objednajte sa k nám
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-main/5 rounded-2xl p-6 border border-main/20">
                <p className="text-main2 leading-relaxed">
                  <span className="font-semibold text-main">Tip:</span> {openingData.tip}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
