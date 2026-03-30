import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  FileText,
  CheckCircle2,
  Scale,
  ShieldAlert,
  UserX,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />
      <main className="grow">
        {/* Hero Banner */}
        <section className="bg-[#003B5C] py-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="container mx-auto max-w-5xl relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                <FileText className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white">
                Terms of Service
              </h1>
            </div>
            <p className="text-white/60 text-lg">
              Last updated: January 1, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl space-y-8">
            {[
              {
                icon: <CheckCircle2 className="w-6 h-6 text-[#003B5C]" />,
                title: "Acceptance of Terms",
                content:
                  "By using PST Loans, you agree to these terms. You must be at least 18 years old and legally authorized to enter into this agreement. Continued use of the service constitutes ongoing acceptance.",
              },
              {
                icon: <Scale className="w-6 h-6 text-[#003B5C]" />,
                title: "Services Provided",
                content:
                  "We provide personal loan application, underwriting, funding, and account management services. All loans are subject to credit approval. We reserve the right to modify or discontinue any feature at any time with reasonable notice.",
              },
              {
                icon: <UserX className="w-6 h-6 text-[#003B5C]" />,
                title: "User Conduct",
                content:
                  "You agree not to misuse our service, submit false or misleading information, or attempt unauthorized access to any part of our systems. Violations may result in immediate account termination and referral to law enforcement.",
              },
              {
                icon: <ShieldAlert className="w-6 h-6 text-[#003B5C]" />,
                title: "Limitation of Liability",
                content:
                  "PST Loans is not liable for indirect, incidental, or punitive damages resulting from service use. Our total liability shall not exceed the amount of fees paid by you in the 12 months preceding the claim.",
              },
            ].map((section, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#003B5C] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
