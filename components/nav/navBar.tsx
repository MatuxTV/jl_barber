"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlarmClockCheck, Globe } from "lucide-react";
import MobileNav from "@/components/nav/mobileNav";

interface NavItem {
  title: string;
  href: string;
}

interface NavLanguageOption {
  code: string;
  flag: string;
}

interface AnimatedNavbarProps {
  navTitles: NavItem[];
  languageOptions: NavLanguageOption[];
  locale: string;
  t: {
    nav: {
      book: string;
    };
  };
}

// Animation variants
const navVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
} as const;

const logoVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring" as const,
      stiffness: 100,
    },
  },
} as const;

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

export default function ResponsiveNavbar({
  navTitles,
  languageOptions,
  locale,
  t,
}: AnimatedNavbarProps) {
  return (
    <motion.nav
      className="w-full sticky h-20 md:h-32 top-0 z-40 bg-main-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo - Absolútne pozicionované */}
      <motion.div
        className="absolute top-2 left-4 md:top-4 md:left-6 z-50"
        variants={logoVariants}
      >
          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            transition={{ type: "spring" as const, stiffness: 300 }}
          >
            <Image
              src="/logo.png"
              alt="JB Barber"
              width={80}
              height={80}
              className="md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px] rounded-full object-cover border-white border-5 shadow-lg transition-transform duration-300"
            />
          </motion.div>
      </motion.div>

      {/* Hlavný kontajner - s paddingom pre logo */}
      <div className="h-full flex items-center justify-center pl-24 md:pl-40 lg:pl-48 pr-6">
        <div className="flex items-center justify-between w-full max-w-5xl">
          {/* Navigation Links - Centrované */}
          <motion.div
            className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 flex-1"
            variants={navItemVariants}
          >
            {navTitles.map((item, index) => (
              <motion.div
                key={index}
                variants={navItemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.href}
                  className="text-main hover:text-main1 font-medium transition-colors duration-300 relative group"
                >
                  {item.title}
                  <motion.span
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-main1"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Navigation - Hamburger menu môžeš pridať neskôr */}
                    {/* Mobile Navigation */}
          <motion.div
            className="md:hidden flex-1 flex justify-center"
            variants={navItemVariants}
          >
            <MobileNav
              navItems={navTitles}
              languageOptions={languageOptions}
              locale={locale}
              bookingText={t.nav.book}
              bookingUrl="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9"
            />
          </motion.div>

          {/* Right side - Book button and Language */}
          <motion.div
            className="flex items-center space-x-2 md:space-x-4"
            variants={navItemVariants}
          >
            {/* Book Button */}
            <motion.div variants={navItemVariants}>
              <Link
                href="https://booqme.sk/sk/rezervacia/jl-barber-a-ladyhair-salon9"
                className="block"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <Button className="group relative flex items-center gap-1 md:gap-2 bg-gradient-to-r from-main via-main2 to-main text-main-white px-3 md:px-6 py-2 md:py-2.5 rounded-full font-medium transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden text-sm md:text-base">
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-main2 via-main to-main2 rounded-full"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: 12,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <AlarmClockCheck className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>

                    {/* Text - skryté na malých obrazovkách */}
                    <span className="relative z-10 hidden sm:inline">
                      {t.nav.book}
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Language Dropdown */}
            <motion.div variants={navItemVariants}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-gray-100 w-8 h-8 md:w-10 md:h-10"
                    >
                      <Globe className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="p-2 bg-white border border-gray-200 shadow-lg rounded-lg"
                >
                  <motion.div
                    className="flex flex-col gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languageOptions.map((lang, index) => (
                      <motion.div
                        key={lang.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <Link
                          href={`/${lang.code}`}
                          className={`flex items-center py-2 px-3 rounded-md transition-colors duration-200 ${
                            locale === lang.code
                              ? "bg-main1 text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring" as const,
                              stiffness: 300,
                            }}
                          >
                            <Image
                              src={lang.flag}
                              alt={lang.code}
                              width={20}
                              height={14}
                              className="object-cover rounded-sm"
                            />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </motion.nav>
  );
}
