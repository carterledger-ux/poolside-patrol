/*
  DESIGN: Sun-Drenched Organic
  Navbar: Transparent on top, becomes warm-white with blur on scroll.
  Warm golden accent on active link. Organic rounded pill nav items.
*/

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const LOGO_WHITE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/logo-white_982b2864.png";
const LOGO_COLOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/logo-color_90da5ae0.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Certifications", href: "#certifications" },
  { label: "Staff", href: "/staff", isPage: true },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage) {
      window.location.href = href;
      return;
    }
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-warm-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2 group"
          >
            <img
              src={scrolled ? LOGO_COLOR : LOGO_WHITE}
              alt="Poolside Patrol"
              className="h-16 w-auto group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href, (link as any).isPage); }}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 hover:bg-golden/20 ${
                  scrolled ? "text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/reservations"
              className="ml-3 px-6 py-2.5 bg-teal text-white rounded-full text-sm font-body font-semibold shadow-lg hover:shadow-xl hover:bg-teal-dark transition-all duration-300 hover:-translate-y-0.5"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-warm-white/98 backdrop-blur-2xl pt-24 px-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href, (link as any).isPage); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl font-display font-semibold text-foreground py-3 px-4 rounded-2xl hover:bg-peach transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/reservations"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white rounded-full text-lg font-body font-semibold shadow-lg"
              >
                <Phone size={20} />
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
