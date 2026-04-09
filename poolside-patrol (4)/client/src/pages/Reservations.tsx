/*
  DESIGN: Sun-Drenched Organic
  Reservations page - calendar-based booking system.
  Step flow: 1) Pick a date → 2) Pick a time slot → 3) Fill out details → 4) Confirmation
*/

import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  MessageSquare,
  CheckCircle2,
  LifeBuoy,
  ChevronLeft,
  PartyPopper,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Slider } from "@/components/ui/slider";

const LOGO_COLOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/logo-color_90da5ae0.png";

// ─── TIME SLOTS ───
const TIME_SLOTS = [
  { time: "9:00 AM", period: "Morning" },
  { time: "10:00 AM", period: "Morning" },
  { time: "11:00 AM", period: "Morning" },
  { time: "12:00 PM", period: "Afternoon" },
  { time: "1:00 PM", period: "Afternoon" },
  { time: "2:00 PM", period: "Afternoon" },
  { time: "3:00 PM", period: "Afternoon" },
  { time: "4:00 PM", period: "Evening" },
  { time: "5:00 PM", period: "Evening" },
  { time: "6:00 PM", period: "Evening" },
];

// ─── DURATION OPTIONS ───
const DURATION_OPTIONS = [
  { label: "2 hours", value: 2 },
  { label: "3 hours", value: 3 },
  { label: "4 hours", value: 4 },
  { label: "5+ hours", value: 5 },
];

// ─── EVENT TYPES ───
const EVENT_TYPES = [
  { label: "Birthday Party", icon: <PartyPopper size={18} /> },
  { label: "Pool Party", icon: <Users size={18} /> },
  { label: "Private Swim", icon: <LifeBuoy size={18} /> },
  { label: "Community Event", icon: <MapPin size={18} /> },
  { label: "Other", icon: <MessageSquare size={18} /> },
];

type BookingStep = "date" | "time" | "details" | "confirm";

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  guestCount: string;
  eventType: string;
  duration: number;
  notes: string;
  setupTeardown: boolean;
  lifeJackets: boolean;
  lifeJacketCount: number;
  ageRangeMin: number;
  ageRangeMax: number;
}

const emptyDetails: BookingDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  guestCount: "",
  eventType: "",
  duration: 2,
  notes: "",
  setupTeardown: false,
  lifeJackets: false,
  lifeJacketCount: 0,
  ageRangeMin: 0,
  ageRangeMax: 18,
};

export default function Reservations() {
  const [step, setStep] = useState<BookingStep>("date");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [details, setDetails] = useState<BookingDetails>(emptyDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable past dates and dates more than 90 days out
  const disabledDays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 90);
    return [{ before: today }, { after: maxDate }];
  }, []);

  const stepIndex = ["date", "time", "details", "confirm"].indexOf(step);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setStep("time");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleBack = () => {
    if (step === "time") setStep("date");
    else if (step === "details") setStep("time");
  };

  const submitReservation = trpc.reservation.submit.useMutation({
    onSuccess: (result) => {
      setIsSubmitting(false);
      setStep("confirm");
      if (result.notifications.customerEmail) {
        toast.success("Confirmation email sent!");
      }
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error("Something went wrong. Please try again or email us directly.");
      console.error("[Reservation] Submit error:", error);
    },
  });

  const handleSubmit = () => {
    // Validate
    if (!details.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!details.email.trim() || !details.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!details.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!details.eventType) {
      toast.error("Please select an event type");
      return;
    }

    setIsSubmitting(true);

    const formattedDateStr = selectedDate
      ? selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";

    submitReservation.mutate({
      ...details,
      date: formattedDateStr,
      time: selectedTime,
      setupTeardown: details.setupTeardown,
      lifeJackets: details.lifeJackets,
      lifeJacketCount: details.lifeJackets ? details.lifeJacketCount : 0,
      ageRangeMin: details.ageRangeMin,
      ageRangeMax: details.ageRangeMax,
    });
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const handleStartOver = () => {
    setStep("date");
    setSelectedDate(undefined);
    setSelectedTime("");
    setDetails(emptyDetails);
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="bg-warm-white/90 backdrop-blur-xl border-b border-golden/10 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={LOGO_COLOR}
              alt="Poolside Patrol"
              className="h-10 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container py-12 md:py-16">
        {/* Page Title */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 text-teal font-body text-sm font-semibold mb-4">
            <CalendarDays size={16} />
            Book Your Lifeguard
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Reserve Your Date
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Pick a date, choose a time, and fill in your details. I'll confirm your booking within 24 hours.
          </p>
        </div>

        {/* Progress Steps */}
        {step !== "confirm" && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {["Date", "Time", "Details"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-semibold transition-all duration-300 ${
                    i <= stepIndex
                      ? "bg-teal text-white shadow-lg"
                      : "bg-sand text-muted-foreground"
                  }`}
                >
                  {i < stepIndex ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-sm font-body font-medium hidden sm:inline ${
                    i <= stepIndex ? "text-teal" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {i < 2 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 rounded-full transition-all duration-300 ${
                      i < stepIndex ? "bg-teal" : "bg-sand"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* ═══ STEP 1: DATE ═══ */}
          {step === "date" && (
            <motion.div
              key="date"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-lg mx-auto"
            >
              <div className="bg-cream rounded-[2rem] p-6 sm:p-8 shadow-sm border border-golden/10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2 text-center">
                  Select a Date
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-6 text-center">
                  Choose your preferred pool party date
                </p>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 2: TIME ═══ */}
          {step === "time" && (
            <motion.div
              key="time"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-lg mx-auto"
            >
              <div className="bg-cream rounded-[2rem] p-6 sm:p-8 shadow-sm border border-golden/10">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ChevronLeft size={16} />
                  Change date
                </button>
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                  Pick a Start Time
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  {formattedDate}
                </p>

                <div className="space-y-6">
                  {["Morning", "Afternoon", "Evening"].map((period) => {
                    const slots = TIME_SLOTS.filter((s) => s.period === period);
                    if (slots.length === 0) return null;
                    return (
                      <div key={period}>
                        <h3 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          {period}
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                          {slots.map((slot) => (
                            <button
                              key={slot.time}
                              onClick={() => handleTimeSelect(slot.time)}
                              className={`py-3 px-4 rounded-xl font-body text-sm font-medium transition-all duration-200 border ${
                                selectedTime === slot.time
                                  ? "bg-teal text-white border-teal shadow-lg"
                                  : "bg-warm-white border-golden/10 text-foreground hover:border-teal/30 hover:bg-teal/5"
                              }`}
                            >
                              <Clock size={14} className="inline mr-1.5 -mt-0.5" />
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 3: DETAILS ═══ */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-cream rounded-[2rem] p-6 sm:p-8 shadow-sm border border-golden/10">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ChevronLeft size={16} />
                  Change time
                </button>

                {/* Summary bar */}
                <div className="flex flex-wrap gap-3 mb-8 p-4 bg-teal/5 rounded-xl border border-teal/10">
                  <span className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-teal">
                    <CalendarDays size={14} />
                    {selectedDate?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-teal">
                    <Clock size={14} />
                    {selectedTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Your Details
                </h2>

                <div className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-2">
                        <User size={14} className="text-teal" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl bg-warm-white border border-golden/15 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-2">
                        <Mail size={14} className="text-teal" />
                        Email *
                      </label>
                      <input
                        type="email"
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-warm-white border border-golden/15 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-2">
                        <Phone size={14} className="text-teal" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl bg-warm-white border border-golden/15 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-2">
                        <MapPin size={14} className="text-teal" />
                        Pool Address
                      </label>
                      <input
                        type="text"
                        value={details.address}
                        onChange={(e) => setDetails({ ...details, address: e.target.value })}
                        placeholder="123 Main St, Flower Mound"
                        className="w-full px-4 py-3 rounded-xl bg-warm-white border border-golden/15 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-3">
                      <PartyPopper size={14} className="text-teal" />
                      Event Type *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EVENT_TYPES.map((type) => (
                        <button
                          key={type.label}
                          onClick={() => setDetails({ ...details, eventType: type.label })}
                          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-200 border ${
                            details.eventType === type.label
                              ? "bg-teal text-white border-teal shadow-md"
                              : "bg-warm-white border-golden/15 text-foreground hover:border-teal/30"
                          }`}
                        >
                          {type.icon}
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ─── Age Range Slider ─── */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-3">
                      <Users size={14} className="text-teal" />
                      Swimmer Age Range
                    </label>
                    <div className="bg-warm-white rounded-xl p-5 border border-golden/15">
                      <div className="flex justify-center gap-6 items-center mb-5">
                        <div className="text-center">
                          <span className="block text-xs font-body text-muted-foreground mb-1">Min age</span>
                          <span className="block text-2xl font-display font-bold text-foreground">{details.ageRangeMin}</span>
                        </div>
                        <span className="text-muted-foreground/40 text-lg mt-4">-</span>
                        <div className="text-center">
                          <span className="block text-xs font-body text-muted-foreground mb-1">Max age</span>
                          <span className="block text-2xl font-display font-bold text-foreground">{details.ageRangeMax}</span>
                        </div>
                      </div>
                      <Slider
                        min={0}
                        max={99}
                        step={1}
                        value={[details.ageRangeMin, details.ageRangeMax]}
                        onValueChange={(vals: number[]) => {
                          setDetails({ ...details, ageRangeMin: vals[0], ageRangeMax: vals[1] });
                        }}
                        className="[&_[data-slot=slider-track]]:bg-sand [&_[data-slot=slider-range]]:bg-teal [&_[data-slot=slider-thumb]]:border-teal [&_[data-slot=slider-thumb]]:size-5"
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-xs font-body text-muted-foreground/60">0</span>
                        <span className="text-xs font-body text-muted-foreground/60">99</span>
                      </div>
                    </div>
                  </div>

                  {/* ─── Add-ons ─── */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-3">
                      <CheckCircle2 size={14} className="text-teal" />
                      Add-ons
                    </label>
                    <div className="space-y-3">
                      {/* Setup & Teardown */}
                      <label className="flex items-start gap-3 bg-warm-white rounded-xl p-4 border border-golden/15 cursor-pointer hover:border-teal/30 transition-all">
                        <input
                          type="checkbox"
                          checked={details.setupTeardown}
                          onChange={(e) => setDetails({ ...details, setupTeardown: e.target.checked })}
                          className="mt-0.5 w-5 h-5 rounded border-golden/30 text-teal focus:ring-teal/30 accent-teal"
                        />
                        <div>
                          <span className="block font-body text-sm font-semibold text-foreground">Pre-Party Setup & Post-Party Teardown</span>
                          <span className="block font-body text-xs text-muted-foreground mt-0.5">Arrive 90 min early for setup, stay 1 hr after for cleanup</span>
                          <span className="block font-body text-sm font-bold text-teal mt-1">+ $50</span>
                        </div>
                      </label>

                      {/* Life Jackets */}
                      <label className="flex items-start gap-3 bg-warm-white rounded-xl p-4 border border-golden/15 cursor-pointer hover:border-teal/30 transition-all">
                        <input
                          type="checkbox"
                          checked={details.lifeJackets}
                          onChange={(e) => setDetails({ ...details, lifeJackets: e.target.checked, lifeJacketCount: e.target.checked ? Math.max(details.lifeJacketCount, 1) : 0 })}
                          className="mt-0.5 w-5 h-5 rounded border-golden/30 text-teal focus:ring-teal/30 accent-teal"
                        />
                        <div className="flex-1">
                          <span className="block font-body text-sm font-semibold text-foreground">Life Jackets</span>
                          <span className="block font-body text-xs text-muted-foreground mt-0.5">I'll bring life jackets for your swimmers</span>
                          <span className="block font-body text-sm font-bold text-teal mt-1">$7 per jacket</span>
                          {details.lifeJackets && (
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs font-body text-muted-foreground">Quantity:</span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); setDetails({ ...details, lifeJacketCount: Math.max(1, details.lifeJacketCount - 1) }); }}
                                  className="w-8 h-8 rounded-lg bg-sand text-foreground font-body font-bold flex items-center justify-center hover:bg-golden/20 transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-10 text-center font-body font-semibold text-foreground">{details.lifeJacketCount}</span>
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); setDetails({ ...details, lifeJacketCount: Math.min(25, details.lifeJacketCount + 1) }); }}
                                  className="w-8 h-8 rounded-lg bg-sand text-foreground font-body font-bold flex items-center justify-center hover:bg-golden/20 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-xs font-body font-semibold text-teal">= ${details.lifeJacketCount * 7}</span>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Duration & Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-3">
                        <Clock size={14} className="text-teal" />
                        Duration
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {DURATION_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setDetails({ ...details, duration: opt.value })}
                            className={`px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-200 border ${
                              details.duration === opt.value
                                ? "bg-teal text-white border-teal shadow-md"
                                : "bg-warm-white border-golden/15 text-foreground hover:border-teal/30"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-2">
                        <Users size={14} className="text-teal" />
                        Estimated Guests
                      </label>
                      <input
                        type="text"
                        value={details.guestCount}
                        onChange={(e) => setDetails({ ...details, guestCount: e.target.value })}
                        placeholder="e.g. 10-15 kids"
                        className="w-full px-4 py-3 rounded-xl bg-warm-white border border-golden/15 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground mb-2">
                      <MessageSquare size={14} className="text-teal" />
                      Additional Notes
                    </label>
                    <textarea
                      value={details.notes}
                      onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                      placeholder="Any special requests, pool details, or questions..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-warm-white border border-golden/15 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-6 bg-teal hover:bg-teal-dark text-white rounded-xl font-body font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        Submit Reservation Request
                        <ArrowRight size={18} />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 4: CONFIRMATION ═══ */}
          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <div className="bg-cream rounded-[2rem] p-8 sm:p-12 shadow-sm border border-golden/10 text-center">
                <div className="w-20 h-20 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                  Request Received!
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Thanks, {details.name.split(" ")[0]}! I've received your reservation request and will confirm your booking within 24 hours via email at <span className="font-semibold text-foreground">{details.email}</span>.
                </p>

                {/* Booking Summary */}
                <div className="bg-warm-white rounded-2xl p-6 text-left mb-8 border border-golden/10">
                  <h3 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Booking Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CalendarDays size={16} className="text-teal shrink-0" />
                      <span className="font-body text-sm text-foreground">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-teal shrink-0" />
                      <span className="font-body text-sm text-foreground">{selectedTime} · {details.duration} hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PartyPopper size={16} className="text-teal shrink-0" />
                      <span className="font-body text-sm text-foreground">{details.eventType}</span>
                    </div>
                    {details.guestCount && (
                      <div className="flex items-center gap-3">
                        <Users size={16} className="text-teal shrink-0" />
                        <span className="font-body text-sm text-foreground">{details.guestCount} guests</span>
                      </div>
                    )}
                    {details.address && (
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-teal shrink-0" />
                        <span className="font-body text-sm text-foreground">{details.address}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-teal shrink-0" />
                      <span className="font-body text-sm text-foreground">Ages {details.ageRangeMin} - {details.ageRangeMax}</span>
                    </div>
                    {details.setupTeardown && (
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-teal shrink-0" />
                        <span className="font-body text-sm text-foreground">Pre-Party Setup & Post-Party Teardown (+$50)</span>
                      </div>
                    )}
                    {details.lifeJackets && (
                      <div className="flex items-center gap-3">
                        <LifeBuoy size={16} className="text-teal shrink-0" />
                        <span className="font-body text-sm text-foreground">Life Jackets x{details.lifeJacketCount} (+${details.lifeJacketCount * 7})</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-teal text-white rounded-xl font-body font-semibold shadow-lg hover:bg-teal-dark transition-all duration-300"
                  >
                    <ArrowLeft size={16} />
                    Back to Home
                  </Link>
                  <button
                    onClick={handleStartOver}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-golden/20 text-golden-dark rounded-xl font-body font-semibold border border-golden/30 hover:bg-golden/30 transition-all duration-300"
                  >
                    Book Another Date
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info note */}
        {step !== "confirm" && (
          <p className="text-center font-body text-sm text-muted-foreground mt-8">
            Serving Flower Mound, Highland Village, Lewisville, and surrounding areas.
            <br />
            Questions? Email{" "}
            <button
              onClick={() => {
                navigator.clipboard.writeText("poolsidepatrol@gmail.com");
                const el = document.getElementById("res-email-text");
                if (el) { el.textContent = "Copied!"; setTimeout(() => { el.textContent = "poolsidepatrol@gmail.com"; }, 2000); }
              }}
              id="res-email-text"
              className="text-teal hover:underline cursor-pointer bg-transparent border-none p-0 font-body text-sm"
            >
              poolsidepatrol@gmail.com
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
