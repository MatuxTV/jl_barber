"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type aboutInfo = {
  title: string;
  text: string;
  image: string;
};

export default function About({ aboutInfo }: { aboutInfo: aboutInfo[] }) {
  return (
    <section id="about" className=" min-h-8/12 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row items-center">
            {/* Image Section */}
            <motion.div
              className="lg:w-2/3 w-full p-8 lg:p-12 flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <Image
                  src={aboutInfo[0].image}
                  alt="About Us"
                  width={600}
                  height={700}
                  className="rounded-2xl shadow-2xl border-4 border-white object-cover"
                />
                {/* Decorative element */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-main/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-main1/20 rounded-full blur-xl"></div>
              </div>
            </motion.div>

            {/* Text Content Section */}
            <motion.div
              className="lg:w-1/2 w-full p-8 lg:p-12 lg:pl-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="max-w-lg">
                <motion.h2
                  className="text-4xl lg:text-5xl text-center font-bold font-playfair-display text-main mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {aboutInfo[0].title}
                </motion.h2>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <p className="text-lg text-center text-main2/70 leading-relaxed">
                    {aboutInfo[0].text}
                  </p>

                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}