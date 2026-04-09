/*
  DESIGN: Sun-Drenched Organic
  Warm, inviting footer with teal background and golden accents.
*/

import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-dark text-white/90">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/logo-white_982b2864.png"
                alt="Poolside Patrol"
                className="h-14 w-auto"
              />
            </div>
            <p className="font-body text-white/70 leading-relaxed">
              Professional private lifeguard services for your backyard pool parties in Flower Mound, TX and surrounding areas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg text-golden mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["About", "Services", "Certifications", "Testimonials", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-white/70 hover:text-golden transition-colors w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg text-golden mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-golden shrink-0" />
                <span className="font-body text-white/70">Flower Mound, TX</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("poolsidepatrol@gmail.com");
                  const el = document.getElementById("footer-email-text");
                  if (el) { el.textContent = "Copied!"; setTimeout(() => { el.textContent = "poolsidepatrol@gmail.com"; }, 2000); }
                }}
                className="flex items-center gap-3 hover:text-golden transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
              >
                <Mail size={18} className="text-golden shrink-0" />
                <span id="footer-email-text" className="font-body text-white/70 hover:text-golden transition-colors">poolsidepatrol@gmail.com</span>
              </button>
              <a href="tel:+19727461586" className="flex items-center gap-3 hover:text-golden transition-colors">
                <Phone size={18} className="text-golden shrink-0" />
                <span className="font-body text-white/70 hover:text-golden transition-colors">(972) 746-1586</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="font-body text-sm text-white/50">
            &copy; {currentYear} Poolside Patrol. All rights reserved. Serving Flower Mound, TX and surrounding communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
