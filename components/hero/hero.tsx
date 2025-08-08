"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

type heroProps = {
  title: string;
  subtitle: string;
  buttonOrder: string;
  buttonPreview: string;
};

// Animation variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3,
    },
  },
};

const contentVariants = {
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

export default function Hero({ heroTitles }: { heroTitles: heroProps[] }) {
  const heroData = heroTitles[0];

  return (
    <motion.section
      id="home"
      className="relative w-full h-screen overflow-hidden -mt-20 md:-mt-32"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/portfolio/hero_photo.jpg"
          alt="Hero Image"
          fill
          className="object-cover"
          priority
          quality={100}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(255, 255, 255, 0.7) 35%, 
              rgba(255, 255, 255, 0.5) 75%,
              rgba(255, 255, 255, 0.3) 100%)`,
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center text-center">
        <div className="container flex mx-auto px-6 justify-center items-center lg:px-8">
          <div className="max-w-4xl">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-playfair-display text-main mb-6 leading-tight"
              variants={contentVariants}
            >
              {heroData.title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-main2/90 mb-8 w-full text-center items-center leading-relaxed"
              variants={contentVariants}
            >
              {heroData.subtitle}
            </motion.p>

            <motion.div className="flex gap-6 justify-center">
              {/* Booking first button */}
              <Link href="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9">
                <Button className="group relative flex items-center gap-2 bg-main text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-100 shadow-lg hover:border-2 hover:border-white hover:shadow-xl overflow-hidden">
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                      repeatDelay: 3,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                  />

                  <span className="relative z-10">{heroData.buttonOrder}</span>

                  {/* Arrow icon */}
                  <motion.svg
                    className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </Button>
              </Link>
              {/* Second button */}
              <Link href="#portfolio">
                <Button className="group relative flex items-center gap-2 bg-white text-main border-main border-3 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:text-white hover:bg-main hover:shadow-xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                      repeatDelay: 3,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                  />

                  <span className="relative z-10">
                    {heroData.buttonPreview}
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const nextSection =
              document.querySelector("#gallery") ||
              document.querySelector("section:nth-of-type(2)");
            nextSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {/* Mouse container */}
          <motion.div
            className="relative w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center bg-white/10 backdrop-blur-sm group-hover:border-main1 group-hover:bg-main1/10 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            {/* Bouncing scroll wheel */}
            <motion.div
              className="w-1 h-2 bg-gray-500 rounded-full mt-1 group-hover:bg-main1 transition-colors duration-300"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
          </motion.div>

          {/* Text with fade animation */}
          <motion.span
            className="text-xs text-gray-500 mt-3 font-medium group-hover:text-main1 transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll Down
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
