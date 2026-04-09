/*
  STAFF PAGE - Meet Your Lifeguard (moved from Home)
  Full dedicated page for Ledger Carter's bio and background.
*/

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Shield,
  Heart,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const LIFEGUARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/lifeguard-action-c8XVdD2GAoeYruJ9WSCYzC.webp";

const certifications = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "American Red Cross",
    subtitle: "Lifeguard Certified",
    color: "bg-red-50 text-red-600 border-red-200",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "CPR & AED",
    subtitle: "Certified",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "First Aid",
    subtitle: "Certified",
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
];

export default function Staff() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-teal to-teal-dark">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-golden-light font-body text-sm font-semibold mb-4">
              Our Team
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Meet Your Lifeguard
            </h1>
            <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
              Dedicated, certified, and committed to keeping every swimmer safe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="container">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Photo */}
              <div className="relative">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <img
                    src={LIFEGUARD_IMG}
                    alt="Ledger Carter - Professional Lifeguard"
                    className="w-full h-auto object-cover aspect-[3/4] max-h-[700px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 bg-golden text-teal-dark px-6 py-3 rounded-2xl shadow-xl font-body font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} />
                    Eagle Scout Candidate
                  </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-peach rounded-full opacity-60 blur-xl -z-10" />
              </div>

              {/* Text */}
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-peach text-golden-dark font-body text-sm font-semibold mb-4">
                  Founder & Lead Lifeguard
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                  Hi, I'm{" "}
                  <span className="text-teal">Ledger Carter</span>
                </h2>
                <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-lg">
                  <p>
                    I am the founder of Poolside Patrol and an experienced lifeguard dedicated to maintaining
                    a safe and enjoyable environment in and around the water. Currently a junior at Flower
                    Mound High School, I also work at Lifetime Fitness, where I've developed skills in a
                    professional aquatic setting.
                  </p>
                  <p>
                    I hold certifications through the American Red Cross.
                    I am trained in CPR, AED, and First Aid. Safety is my top priority at every event, whether
                    supervising a small gathering or a large group. I remain attentive, prepared, and focused
                    at all times.
                  </p>
                  <p>
                    In addition to my work as a lifeguard, I am actively pursuing the rank of Eagle Scout.
                    Through this experience, I have developed leadership, responsibility, and a commitment
                    to keep quality for all jobs I take on.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Lifetime Fitness Lifeguard", "FMHS Junior", "Eagle Scout Candidate"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-sand font-body text-sm font-medium text-foreground border border-golden/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Certifications mini-grid */}
                <div className="mt-10">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">Certifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {certifications.map((cert, i) => (
                      <a
                        key={i}
                        href="/certificates"
                        className={`group rounded-xl p-4 text-center border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${cert.color}`}
                      >
                        <div className="flex justify-center mb-2">
                          {cert.icon}
                        </div>
                        <h4 className="font-display text-sm font-bold mb-0.5">{cert.title}</h4>
                        <p className="font-body text-xs opacity-80">{cert.subtitle}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <a
                    href="/reservations"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-teal text-white rounded-full font-body font-semibold text-lg shadow-xl hover:shadow-2xl hover:bg-teal-dark transition-all duration-300 hover:-translate-y-1"
                  >
                    Book Ledger for Your Event
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
