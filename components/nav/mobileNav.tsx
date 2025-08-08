"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, AlarmClockCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  title: string;
  href: string;
}

interface LanguageOption {
  code: string;
  flag: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  languageOptions: LanguageOption[];
  locale: string;
  bookingText: string;
  bookingUrl: string;
}

// Animation variants
const menuVariants = {
  closed: { 
    opacity: 0, 
    scale: 0.95,
    y: -10
  },
  open: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const
    }
  }
};

const itemVariants = {
  closed: { 
    opacity: 0, 
    x: -20 
  },
  open: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3
    }
  })
};

const languageVariants = {
  closed: { 
    opacity: 0, 
    scale: 0.8 
  },
  open: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2 + (index * 0.1),
      duration: 0.3
    }
  })
};

export default function MobileNav({
  navItems,
  languageOptions,
  locale,
  bookingText,
  bookingUrl,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-main border border-gray-200 hover:bg-gray-50 hover:text-main1 transition-colors duration-200 shadow-sm"
            aria-label="Toggle Menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          className="p-0 bg-white border border-gray-200 shadow-xl rounded-lg w-72 mr-4"
          align="end"
          sideOffset={8}
        >
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="p-6"
          >
            {/* Navigation Links */}
            <nav className="space-y-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Navigácia
                </h3>
              </motion.div>
              
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  custom={index}
                >
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:text-main1 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <DropdownMenuSeparator className="my-6" />

            {/* Booking Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mb-6"
            >
              <Link href={bookingUrl}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-main via-main2 to-main text-main-white px-6 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Shimmer effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        ease: "linear",
                        repeatDelay: 3 
                      }}
                    />
                    
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <AlarmClockCheck className="w-5 h-5" />
                    </motion.div>
                    
                    <span className="relative z-10 text-lg">{bookingText}</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <DropdownMenuSeparator className="my-6" />

            {/* Language Selection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Jazyk / Language
              </h3>
              
              <div className="flex items-center justify-center space-x-4">
                {languageOptions.map((lang, index) => (
                  <motion.div
                    key={lang.code}
                    variants={languageVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                  >
                    <Link
                      href={`/${lang.code}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all duration-200 ${
                          locale === lang.code
                            ? "bg-main1 border-main2 shadow-lg ring-2 ring-main1/30"
                            : "bg-white border-gray-300 hover:bg-gray-50 hover:border-main1 shadow-md"
                        }`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <Image
                          src={lang.flag}
                          alt={`${lang.code} flag`}
                          width={28}
                          height={20}
                          className="object-cover rounded-sm"
                        />
                        
                        {locale === lang.code && (
                          <motion.div 
                            className="absolute inset-0 rounded-full ring-2 ring-white/50"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Current language indicator */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-sm text-gray-600 font-medium">
                  {locale === 'sk' ? 'Slovenčina' : 'English'}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}