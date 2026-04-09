/*
  CERTIFICATES PAGE - Shows actual certification documents organized by employee.
  Accessible by clicking certification cards on the site.
  Employee dropdown allows selecting different staff members (currently Ledger Carter).
*/

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Heart,
  CheckCircle2,
  Waves,
  ExternalLink,
  ArrowLeft,
  ChevronDown,
  User,
  FolderOpen,
} from "lucide-react";

const CERT_PDF_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663396434137/aAnVL3SbTJA7MwoT2uM8ac/RedCrossCertificateMERGEforAchievementAssignment_c9744d7b.pdf";

// ─── EMPLOYEE DATA ───
// Each employee has their own folder of certificates.
// Add new employees here as the team grows.
type Certificate = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  dateCompleted: string;
  validUntil: string;
  conductedBy: string;
  verificationId: string | null;
  verificationUrl: string | null;
  color: string;
  iconColor: string;
  hasPdf: boolean;
  pdfUrl?: string;
};

type Employee = {
  id: string;
  name: string;
  role: string;
  certificates: Certificate[];
};

const employees: Employee[] = [
  {
    id: "ledger-carter",
    name: "Ledger Carter",
    role: "Founder & Lead Lifeguard",
    certificates: [
      {
        icon: <Shield className="w-10 h-10" />,
        title: "American Red Cross",
        subtitle: "Lifeguarding (Including Deep Water) with CPR/AED for Professional Rescuers and First Aid and Waterpark Skills",
        dateCompleted: "July 17, 2025",
        validUntil: "July 17, 2027",
        conductedBy: "The Town of Flower Mound",
        verificationId: "020AEOM",
        verificationUrl: "https://redcross.org/digitalcertificate",
        color: "border-red-300 bg-red-50",
        iconColor: "text-red-600",
        hasPdf: true,
        pdfUrl: CERT_PDF_URL,
      },

      {
        icon: <Heart className="w-10 h-10" />,
        title: "CPR & AED",
        subtitle: "CPR/AED for Professional Rescuers",
        dateCompleted: "July 17, 2025",
        validUntil: "July 17, 2027",
        conductedBy: "American Red Cross / Town of Flower Mound",
        verificationId: "020AEOM",
        verificationUrl: "https://redcross.org/digitalcertificate",
        color: "border-emerald-300 bg-emerald-50",
        iconColor: "text-emerald-600",
        hasPdf: true,
        pdfUrl: CERT_PDF_URL,
      },
      {
        icon: <CheckCircle2 className="w-10 h-10" />,
        title: "First Aid",
        subtitle: "First Aid Certification",
        dateCompleted: "July 17, 2025",
        validUntil: "July 17, 2027",
        conductedBy: "American Red Cross / Town of Flower Mound",
        verificationId: "020AEOM",
        verificationUrl: "https://redcross.org/digitalcertificate",
        color: "border-amber-300 bg-amber-50",
        iconColor: "text-amber-600",
        hasPdf: true,
        pdfUrl: CERT_PDF_URL,
      },
      {
        icon: <Waves className="w-10 h-10" />,
        title: "Waterpark Skills",
        subtitle: "Waterpark Lifeguarding Skills",
        dateCompleted: "July 17, 2025",
        validUntil: "July 17, 2027",
        conductedBy: "American Red Cross / Town of Flower Mound",
        verificationId: "020AEOM",
        verificationUrl: "https://redcross.org/digitalcertificate",
        color: "border-cyan-300 bg-cyan-50",
        iconColor: "text-cyan-600",
        hasPdf: true,
        pdfUrl: CERT_PDF_URL,
      },
    ],
  },
  // Add more employees here as the team grows, e.g.:
  // {
  //   id: "new-employee",
  //   name: "New Employee",
  //   role: "Lifeguard",
  //   certificates: [...],
  // },
];

export default function Certificates() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId) ?? employees[0];

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
              Verified Credentials
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Certifications & Records
            </h1>
            <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
              View official certification documents and verification records for our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation + Employee Selector */}
      <div className="bg-warm-white pt-8 pb-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Back link */}
            <a
              href="/staff"
              className="inline-flex items-center gap-2 font-body text-teal hover:text-teal-dark transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Staff
            </a>

            {/* Employee Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-xl border-2 border-golden/20 font-body font-semibold text-foreground hover:border-teal/40 transition-all duration-200 shadow-sm min-w-[260px]"
              >
                <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0">
                  <User size={16} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">{selectedEmployee.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedEmployee.role}</p>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-full bg-white rounded-xl border-2 border-golden/20 shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-2 border-b border-golden/10">
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-2">
                      <FolderOpen size={12} />
                      Employee Folders
                    </p>
                  </div>
                  {employees.map((employee) => (
                    <button
                      key={employee.id}
                      onClick={() => {
                        setSelectedEmployeeId(employee.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-peach/50 transition-colors ${
                        employee.id === selectedEmployeeId ? "bg-peach/30" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-foreground">{employee.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{employee.role}</p>
                      </div>
                      {employee.id === selectedEmployeeId && (
                        <CheckCircle2 size={16} className="text-teal ml-auto shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Employee Folder Header */}
      <section className="bg-warm-white pt-4 pb-4">
        <div className="container">
          <div className="flex items-center gap-3 px-6 py-4 bg-cream rounded-xl border border-golden/15">
            <FolderOpen size={22} className="text-golden-dark shrink-0" />
            <div>
              <p className="font-body font-semibold text-foreground">
                {selectedEmployee.name}'s Certificates
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {selectedEmployee.certificates.length} certification{selectedEmployee.certificates.length !== 1 ? "s" : ""} on file
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Cards */}
      <section className="py-8 md:py-16 bg-warm-white">
        <div className="container">
          <div className="space-y-8">
            {selectedEmployee.certificates.map((cert, i) => (
              <AnimatedSection key={`${selectedEmployeeId}-${i}`} delay={i * 0.1}>
                <div className={`rounded-[1.5rem] border-2 p-8 md:p-10 ${cert.color} transition-all duration-300`}>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    {/* Icon */}
                    <div className={`shrink-0 ${cert.iconColor}`}>
                      {cert.icon}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                        {cert.title}
                      </h3>
                      <p className="font-body text-muted-foreground mb-4">
                        {cert.subtitle}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Date Completed</p>
                          <p className="font-body font-semibold text-foreground">{cert.dateCompleted}</p>
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Valid Until</p>
                          <p className="font-body font-semibold text-foreground">{cert.validUntil}</p>
                        </div>
                        <div>
                          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Conducted By</p>
                          <p className="font-body font-semibold text-foreground">{cert.conductedBy}</p>
                        </div>
                        {cert.verificationId && (
                          <div>
                            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Verification ID</p>
                            <p className="font-body font-semibold text-foreground">{cert.verificationId}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {cert.hasPdf && cert.pdfUrl && (
                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-full font-body text-sm font-semibold hover:bg-teal-dark transition-all duration-300"
                          >
                            View Certificate
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {cert.verificationUrl && (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 text-foreground rounded-full font-body text-sm font-semibold border border-current/10 hover:bg-white transition-all duration-300"
                          >
                            Verify Online
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
