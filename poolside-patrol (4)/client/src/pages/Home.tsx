/*
  DESIGN: Sun-Drenched Organic
  Single-page layout for Poolside Patrol.
  Sections: Hero, Expectations, Services, Certifications + Waterpark Skills (uniform cards), Testimonials, Contact
*/

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaveDivider, { WaveDividerAlt } from "@/components/WaveDivider";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Users,
  Clock,
  Award,
  CheckCircle2,
  Star,
  ArrowRight,
  Waves,
  PartyPopper,
  LifeBuoy,
  ChevronDown,
  Compass,
  DollarSign,
} from "lucide-react";

// ─── IMAGE URLS ───
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/hero-pool-PuinaCd8Jqi5V6ETZJQe2k.webp";
const SUNSET_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/sunset-trees-9a7hAi9pPmbFPP2tAbgFyo.webp";
const SAFETY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/water-safety-cPzS6Bzd9hkNqCs6veSW32.webp";

// ─── DATA ───
const services = [
  {
    icon: <PartyPopper className="w-7 h-7" />,
    title: "Pool Party Lifeguarding",
    description:
      "Professional supervision for birthday parties, neighborhood gatherings, and family celebrations. I keep every swimmer safe so you can enjoy the party.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Private Swim Supervision",
    description:
      "One-on-one or small group pool supervision for families who want an extra layer of safety during everyday swim time.",
  },
  {
    icon: <Waves className="w-7 h-7" />,
    title: "Event Lifeguarding",
    description:
      "Coverage for HOA pool events, team celebrations, and community gatherings. Flexible scheduling to fit your event needs.",
  },
  {
    icon: <Compass className="w-7 h-7" />,
    title: "Scout Safety",
    description:
      "As a Life scout in BSA I am dedicated to maintaining a safe and compliant environment so participants can focus on learning. I provide Lifeguard supervision for scouting swim tests, merit badge requirements, and more.",
  },
];

const certifications = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "American Red Cross",
    subtitle: "Lifeguard Certified",
    color: "bg-red-50 text-red-600 border-red-200",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "CPR & AED",
    subtitle: "Certified",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "First Aid",
    subtitle: "Certified",
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    icon: <Waves className="w-8 h-8" />,
    title: "Waterpark Skills",
    subtitle: "Red Cross Certified",
    color: "bg-cyan-50 text-cyan-600 border-cyan-200",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Flower Mound, TX",
    text: "Ledger was amazing at my daughter's birthday pool party. He was attentive, professional, and the kids loved him. I could actually relax and enjoy the party knowing everyone was safe!",
    rating: 5,
  },
  {
    name: "Mike & Jennifer T.",
    location: "Highland Village, TX",
    text: "We've used Poolside Patrol for two summers now. Ledger is always on time, incredibly responsible, and great with kids. Highly recommend to any parent hosting a pool party.",
    rating: 5,
  },
  {
    name: "The Rodriguez Family",
    location: "Flower Mound, TX",
    text: "Having a certified lifeguard at our family reunion gave us so much peace of mind. Ledger handled everything professionally and even taught the kids some water safety basics.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Beautiful backyard pool at golden hour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative container pt-32 pb-24">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Peace of Mind for{" "}
              <span className="text-golden italic">Every</span>{" "}
              Pool Party
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
            >
              Professional, certified lifeguard services for your backyard pool parties
              and events. Relax and enjoy while I keep everyone safe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/reservations"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-teal text-white rounded-full font-body font-semibold text-lg shadow-xl hover:shadow-2xl hover:bg-teal-dark transition-all duration-300 hover:-translate-y-1"
              >
                Reserve Your Date
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-body font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown size={28} className="text-white/50" />
        </div>
      </section>

      {/* Wave transition from hero */}
      <WaveDivider fill="oklch(0.97 0.01 80)" className="-mt-1 relative z-10" />

      {/* ═══════════ EXPECTATIONS ═══════════ */}
      <section id="about" className="py-20 md:py-28 bg-warm-white">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-8">
                Expectations
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-cream rounded-[2rem] p-8 md:p-12 border border-golden/20">
                <div className="flex gap-5 items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-teal/10 text-teal flex items-center justify-center shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      30 Minutes Early Arrival
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Every event, every time
                    </p>
                  </div>
                </div>

                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Your lifeguard will arrive 30 minutes before the scheduled time. In this time they will
                  survey the site, review pool rules and emergency action plan with adults and kids, and set up
                  equipment. If this goes smoothly, there will be plenty of time to assist in setting up for
                  the party before guests arrive. One guard can monitor up to 25 active swimmers.
                </p>
              </div>

              {/* Link to Meet Your Lifeguards */}
              <div className="mt-8 text-center">
                <a
                  href="/staff"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-teal/10 text-teal rounded-full font-body font-semibold text-lg hover:bg-teal hover:text-white transition-all duration-300"
                >
                  Meet Your Lifeguard
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="relative">
        <WaveDividerAlt fill="oklch(0.93 0.04 50)" className="-mb-1" />
        <div className="bg-peach py-20 md:py-28">
          <div className="container">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-golden/20 text-golden-dark font-body text-sm font-semibold mb-4">
                What I Offer
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Services
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                From birthday pool parties to community events, I provide professional lifeguard
                coverage so you can focus on having fun.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {services.map((service, i) => (
                <StaggerItem key={i}>
                  <div className="group bg-warm-white rounded-[1.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-golden/10 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-5 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Sunset image with tagline */}
            <AnimatedSection className="mt-16" delay={0.2}>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src={SUNSET_IMG}
                  alt="Beautiful sunset over trees"
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                    Because exceptional moments
                  </p>
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-golden mt-1">
                    deserve exceptional safety.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        <WaveDividerAlt fill="oklch(0.93 0.04 50)" className="-mt-1" flip />
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section id="pricing" className="py-20 md:py-28 bg-warm-white">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-peach text-golden-dark font-body text-sm font-semibold mb-4">
              Pricing
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. Just professional safety you can count on.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: Private Swim Supervision */}
            <StaggerItem>
              <div className="relative bg-cream rounded-[2rem] p-8 border-2 border-golden/15 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-5">
                  <LifeBuoy size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Private Swim Supervision</h3>
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-teal">$25</span>
                    <span className="font-body text-muted-foreground">/ first 30 min</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mt-1">$35/hr after (billed in 30-min increments)</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Maximum of 5 swimmers",
                    "Everyday family swim time",
                    "Small playdates and swim practice",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-teal mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/reservations"
                  className="block w-full text-center px-6 py-3.5 rounded-full font-body font-semibold text-teal bg-teal/10 border-2 border-teal/20 hover:bg-teal hover:text-white transition-all duration-300"
                >
                  Book Now
                </a>
              </div>
            </StaggerItem>

            {/* Card 2: Pool Party Lifeguarding (Featured) */}
            <StaggerItem>
              <div className="relative bg-teal rounded-[2rem] p-8 border-2 border-teal h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-xl md:-mt-4 md:mb-[-1rem]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 rounded-full bg-golden text-teal-dark font-body text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 text-white flex items-center justify-center mb-5">
                  <PartyPopper size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">Pool Party Lifeguarding</h3>
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-golden-light">$45</span>
                    <span className="font-body text-white/70">/hr</span>
                  </div>
                  <p className="font-body text-sm text-white/60 mt-1">2-hour minimum</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Maximum of 25 active swimmers",
                    "Birthday parties and celebrations",
                    "Neighborhood gatherings",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-golden-light mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/reservations"
                  className="block w-full text-center px-6 py-3.5 rounded-full font-body font-semibold text-teal-dark bg-golden hover:bg-golden-light transition-all duration-300 shadow-lg"
                >
                  Book Now
                </a>
              </div>
            </StaggerItem>

            {/* Card 3: Event & Group Coverage */}
            <StaggerItem>
              <div className="relative bg-cream rounded-[2rem] p-8 border-2 border-golden/15 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mb-5">
                  <Users size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Event & Group Coverage</h3>
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold text-teal">Custom</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mt-1">Based on duration, swimmers, and location</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "For groups exceeding 15 swimmers",
                    "HOA events and team parties",
                    "Scout swim tests and reunions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-teal mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/reservations"
                  className="block w-full text-center px-6 py-3.5 rounded-full font-body font-semibold text-teal bg-teal/10 border-2 border-teal/20 hover:bg-teal hover:text-white transition-all duration-300"
                >
                  Book Now
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Bottom quote */}
          <AnimatedSection className="mt-12 text-center" delay={0.3}>
            <p className="font-body text-lg text-muted-foreground italic max-w-2xl mx-auto">
              Not sure which option is right for you? Reach out and I'll help you find the best fit.
            </p>
            <p className="font-body text-base text-muted-foreground mt-3">
              <a href="tel:+19727461586" className="text-teal hover:text-teal-dark font-semibold not-italic transition-colors">(972)-746-1586</a>
              <span className="mx-2">or</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("Poolsidepatrol@gmail.com");
                  const btn = document.getElementById("copy-email-pricing");
                  if (btn) { btn.textContent = "Copied!"; setTimeout(() => { btn.textContent = "Poolsidepatrol@gmail.com"; }, 2000); }
                }}
                id="copy-email-pricing"
                className="text-teal hover:text-teal-dark font-semibold not-italic transition-colors cursor-pointer bg-transparent border-none"
              >Poolsidepatrol@gmail.com</button>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ CERTIFICATIONS ═══════════ */}
      <section id="certifications" className="py-20 md:py-28 bg-warm-white">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-peach text-golden-dark font-body text-sm font-semibold mb-4">
              Trained & Certified
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Certifications
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Your safety is backed by nationally recognized training and certifications.
              I maintain all credentials current and up to date.
            </p>
          </AnimatedSection>

          {/* All certifications including Waterpark Skills as uniform cards */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <StaggerItem key={i}>
                <a
                  href="/certificates"
                  className={`group relative block rounded-[1.5rem] p-8 text-center border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer h-full ${cert.color}`}
                >
                  <div className="flex justify-center mb-4">
                    {cert.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold mb-1">{cert.title}</h3>
                  <p className="font-body text-sm opacity-80">{cert.subtitle}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-body text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Certificate <ArrowRight size={12} />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Safety equipment image */}
          <AnimatedSection className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" delay={0.3}>
            <div className="rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src={SAFETY_IMG}
                alt="Professional lifeguard safety equipment"
                className="w-full h-auto object-cover max-h-[400px]"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                Always Prepared
              </h3>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                I arrive at every event fully equipped with professional rescue gear, first aid supplies,
                and the training to handle any situation. Your family's safety is never left to chance.
              </p>
              <ul className="space-y-3">
                {[
                  "Professional rescue tube on-hand at all times",
                  "First aid kit with complete emergency supplies",
                  "CPR mask and AED-ready training",
                  "Constant vigilance and active scanning",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-teal mt-0.5 shrink-0" />
                    <span className="font-body text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section id="testimonials" className="relative">
        <WaveDivider fill="oklch(0.45 0.1 200)" className="-mb-1" />
        <div className="bg-teal py-20 md:py-28">
          <div className="container">
            <AnimatedSection className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-golden-light font-body text-sm font-semibold mb-4">
                What Parents Say
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                Trusted by Families
              </h2>
              <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
                Don't just take my word for it - hear from parents who've trusted Poolside Patrol
                with their family's pool safety.
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, i) => (
                <StaggerItem key={i}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-[1.5rem] p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <Star key={j} size={18} className="text-golden fill-golden" />
                      ))}
                    </div>
                    <p className="font-body text-white/90 leading-relaxed mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-body font-semibold text-white">{testimonial.name}</p>
                      <p className="font-body text-sm text-white/50">{testimonial.location}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
        <WaveDivider fill="oklch(0.45 0.1 200)" className="-mt-1" flip />
      </section>

      {/* ═══════════ CTA / CONTACT ═══════════ */}
      <section id="contact" className="py-20 md:py-28 bg-warm-white">
        <div className="container">
          <AnimatedSection>
            <div className="relative bg-cream rounded-[2.5rem] p-10 sm:p-16 text-center overflow-hidden border border-golden/20">
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-golden/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-peach rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto mb-6">
                  <Clock size={28} />
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  Ready to Book?
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                  Secure your pool party date today. I offer flexible scheduling and transparent
                  pricing for the Flower Mound area and beyond.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/reservations"
                    className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-teal text-white rounded-full font-body font-semibold text-lg shadow-xl hover:shadow-2xl hover:bg-teal-dark transition-all duration-300 hover:-translate-y-1"
                  >
                    Reserve Your Date
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("poolsidepatrol@gmail.com");
                      const btn = document.getElementById("copy-email-btn");
                      if (btn) { btn.textContent = "Email Copied!"; setTimeout(() => { btn.textContent = "poolsidepatrol@gmail.com"; }, 2000); }
                    }}
                    id="copy-email-btn"
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-golden/20 text-golden-dark rounded-full font-body font-semibold text-lg border border-golden/30 hover:bg-golden/30 transition-all duration-300 cursor-pointer"
                  >
                    poolsidepatrol@gmail.com
                  </button>
                </div>

                <p className="font-body text-sm text-muted-foreground mt-8">
                  Serving Flower Mound, Highland Village, Lewisville, and surrounding areas
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
