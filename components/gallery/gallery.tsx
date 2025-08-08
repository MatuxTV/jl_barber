"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type galleryItems = {
  src: string;
  alt: string;
};

type galleryInfo = {
  title: string;
  subtitle: string;
  images: galleryItems[];
};

export default function Gallery({ galleryInfo }: { galleryInfo: galleryInfo[] }) {
  const galleryData = galleryInfo[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Navigation functions
  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 
          ? galleryData.images.length - 1 
          : selectedImageIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === galleryData.images.length - 1 
          ? 0 
          : selectedImageIndex + 1
      );
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedImageIndex(null);
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <>
      <section id="gallery" className="py-16 px-6 bg-gradient-to-b from-background-secondary/35 to-background-secondary/30">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair-display text-main mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {galleryData.title}
              </motion.h1>
              
              <motion.div
                className="space-y-4 text-main2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl leading-relaxed">
                  {galleryData.subtitle}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {galleryData.images.map((item, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  

                  {/* Click hint */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>

                  {/* Border effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-main/20 rounded-2xl transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedImageIndex(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <motion.button
                className="absolute -top-12 right-0 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                onClick={() => setSelectedImageIndex(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation Buttons */}
              {galleryData.images.length > 1 && (
                <>
                  <motion.button
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                    onClick={goToPrevious}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                    onClick={goToNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image Container */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={galleryData.images[selectedImageIndex].src}
                  alt={galleryData.images[selectedImageIndex].alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  priority
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {galleryData.images[selectedImageIndex].alt}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {selectedImageIndex + 1} / {galleryData.images.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}