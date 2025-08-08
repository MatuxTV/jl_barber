"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Crown,
  Scissors,
  Palette,
  Sparkles,
  Apple,
  Highlighter,
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  AlarmClockCheck,
} from "lucide-react";
import Link from "next/link";

const navItemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
} as const;

type offerItem = {
  title: string;
  description: string;
  icon: string;
  price: string;
  image: string[]; // Changed from 'image' to 'images' array
};

type offerTitle = {
  title: string;
  subtitle: string;
  info: offerInfo[];
  viewMoreButton: string;
  viewLessButton: string;
  items: offerItem[];
  booking: string;
};

type offerInfo = {
  title: string;
  subtitle: string;
};

// Icon mapping object
const iconMap: Record<string, LucideIcon> = {
  crown: Crown,
  scissors: Scissors,
  palette: Palette,
  nails: Sparkles,
  "hair-extensions": Apple,
  highlights: Highlighter,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName] || Scissors;
};

export default function What_We_Offer({
  offerTitles,
  locale,
}: {
  offerTitles: offerTitle[];
  locale: string;
}) {
  const offerData = offerTitles[0];
  const [showMore, setShowMore] = useState(false);

  // State to track current image index for each service
  const [currentImageIndexes, setCurrentImageIndexes] = useState<
    Record<number, number>
  >({});

  const displayedItems = showMore
    ? offerData.items
    : offerData.items.slice(0, 4);

  // Function to navigate images
  const navigateImage = (itemIndex: number, direction: "prev" | "next") => {
    const item = displayedItems[itemIndex];
    const currentIndex = currentImageIndexes[itemIndex] || 0;
    const totalImages = item.image.length;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % totalImages;
    } else {
      newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    }

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [itemIndex]: newIndex,
    }));
  };

  return (
    <section
      id="services"
      className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-playfair-display font-bold text-main mb-6">
            {offerData.title}
          </h1>
          <div className="max-w-4xl mx-auto p-4 mb-8">
            <p className="text-main2 text-lg leading-relaxed">
              {offerData.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {displayedItems.map((item, index) => {
            const IconComponent = getIcon(item.icon);
            const currentImageIndex = currentImageIndexes[index] || 0;
            const currentImage = item.image[currentImageIndex];
            const hasMultipleImages = item.image.length > 1;

            return (
              <motion.div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Background Image with Animation */}
                <div className="relative h-80 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 backdrop-blur-sm rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={currentImage}
                        alt={`${item.title} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 hover:opacity-75 transition-transform duration-700"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  {hasMultipleImages && (
                    <>
                      {/* Previous Button */}
                      <motion.button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage(index, "prev");
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>

                      {/* Next Button */}
                      <motion.button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 group-hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage(index, "next");
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {item.image.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              imgIndex === currentImageIndex
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/80"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndexes((prev) => ({
                                ...prev,
                                [index]: imgIndex,
                              }));
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t   from-black/90 via-black/30 to-transparent duration-200" />

                  {/* Content Overlay */}
                  <div>
                    {/* Image Counter */}
                    {hasMultipleImages && (
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1}/{item.image.length}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      {/* Price Badge with Icon */}
                      <div className="inline-flex items-center bg-black/30 backdrop-blur-sm text-white px-4 py-2 gap-2 rounded-xl font-bold text-lg shadow-lg mb-4">
                        <div className="bg-main/40 backdrop-blur-sm p-3 rounded-xl">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {item.price}€
                      </div>
                      <h3 className="text-2xl font-bold mb-3  transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed mb-4 opacity-90">
                        {item.description}
                      </p>

                      {/* Action Button */}
                      <Button
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                        size="sm"
                      >
                        {locale === "sk" ? "Viac informácií" : "More info"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {/* View More Button */}
        {offerData.items.length > 4 && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={() => setShowMore(!showMore)}
              className="bg-black/40 hover:bg-black/80  text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <motion.span
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="mr-2 inline-block"
              >
                ↓
              </motion.span>
              {showMore
                ? `${offerData.viewLessButton}`
                : `${offerData.viewMoreButton}`}
            </Button>
          </motion.div>
        )}

        <div className="w-full flex justify-center items-center px-4">
          {/* Booking CTA Section */}
          <motion.div
            className="bg-gradient-to-r from-main to-main2 rounded-2xl p-4 sm:p-6 lg:p-8 text-center text-white shadow-2xl w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
                  {offerData.info[0].title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {offerData.info[0].subtitle}
                </p>
              </div>

              {/* Button Container */}
              <Link href="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9">
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="group relative flex items-center justify-center gap-2 text-main bg-white hover:bg-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 rounded-full font-medium transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden text-sm sm:text-base min-w-[140px] sm:min-w-[160px]">
                    {/* Removed the animated background that was causing issues */}

                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: 12,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <AlarmClockCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>

                    {/* Text - always visible but responsive size */}
                    <span className="relative z-10 whitespace-nowrap">
                      {offerData.booking}
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
