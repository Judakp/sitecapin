import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  User,
  Phone,
} from "lucide-react";
import { Language, ThemeMode } from "../types";
import { useTranslation } from "../data/translations";
import { getFaq } from "../data/portfolioData";
import { getSiteSettings } from "../data/contentStore";

interface ContactSectionProps {
  language: Language;
  theme: ThemeMode;
  prefilledMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  theme,
  prefilledMessage = "",
}) => {
  const t = useTranslation(language);
  const faqs = getFaq(language);
  const [siteSettings, setSiteSettings] = useState(() => getSiteSettings());

  useEffect(() => {
    setSiteSettings(getSiteSettings());
  }, [language]);

  useEffect(() => {
    const handleUpdate = () => {
      setSiteSettings(getSiteSettings());
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("capin_content_updated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("capin_content_updated", handleUpdate);
    };
  }, [language]);

  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Automatisation & IA");
  const [budget, setBudget] = useState("2 000€ - 5 000€");
  const [message, setMessage] = useState(prefilledMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Booking Calendar State
  const [selectedDate, setSelectedDate] = useState("Mardi 3 Mars 2026");
  const [selectedSlot, setSelectedSlot] = useState("14:30");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 800);
  };

  const availableDates = [
    { label: "Mardi 3 Mars", value: "Mardi 3 Mars 2026" },
    { label: "Mercredi 4 Mars", value: "Mercredi 4 Mars 2026" },
    { label: "Jeudi 5 Mars", value: "Jeudi 5 Mars 2026" },
    { label: "Vendredi 6 Mars", value: "Vendredi 6 Mars 2026" },
  ];

  const availableSlots = ["09:30", "11:00", "14:30", "16:00", "17:30"];

  return (
    <div id="contact-page" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>{t.contact.badge}</span>
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {t.contact.title}
        </h1>

        <p className={`text-base sm:text-lg ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
          {(language === "fr" ? siteSettings.contactPitchFr : siteSettings.contactPitchEn) || t.contact.desc}
        </p>
      </div>

      {/* 2. Main Grid: Message Form (Left) & Discovery Call Booking (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              {t.contact.formTitle}
            </h2>
            <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-slate-500"} mt-1`}>
              {t.contact.formSubtitle}
            </p>
          </div>

          {isSent ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-emerald-500">{t.contact.successTitle}</h3>
                <p className={`text-xs ${theme === "dark" ? "text-zinc-300" : "text-slate-600"}`}>
                  {t.contact.successDesc}
                </p>
              </div>
              <button
                onClick={() => setIsSent(false)}
                className="text-xs text-blue-500 underline hover:text-blue-400 font-semibold"
              >
                {t.contact.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t.contact.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@entreprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">{t.contact.phoneLabel}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t.contact.projectTypeLabel}</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                  >
                    <option value="Automatisation & IA">Automatisation & IA</option>
                    <option value="Site Web & Plateforme">Site Web & Plateforme</option>
                    <option value="Application Mobile">Application Mobile</option>
                    <option value="Autre / Conseil">Autre / Conseil Stratégique</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">{t.contact.budgetLabel}</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                >
                  <option value="1 500€ - 3 000€">1 500€ - 3 000€</option>
                  <option value="3 000€ - 6 000€">3 000€ - 6 000€</option>
                  <option value="6 000€ - 12 000€">6 000€ - 12 000€</option>
                  <option value="12 000€+">12 000€+ (Projet d'envergure)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">{t.contact.messageLabel}</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre besoin ou collez le diagnostic généré dans Tester l'IA..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t.contact.submittingBtn : t.contact.submitBtn}</span>
              </button>
            </form>
          )}
        </div>

        {/* 15-Minute Booking Calendar Column */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between border-blue-500/30">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-mono font-semibold">
                Visio 15 min
              </span>
              <span className="text-xs font-mono text-emerald-500 font-bold">100% Gratuit</span>
            </div>

            <div>
              <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {t.contact.bookTitle}
              </h2>
              <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-slate-500"} mt-1`}>
                {t.contact.bookDesc}
              </p>
            </div>

            {bookingConfirmed ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-emerald-500 text-sm">{t.contact.bookConfirmedTitle}</h4>
                <p className={`text-xs ${theme === "dark" ? "text-zinc-200" : "text-slate-700"}`}>
                  {t.contact.bookConfirmedDesc} <br />
                  <strong className="text-blue-500 font-mono">{selectedDate} à {selectedSlot}</strong>
                </p>
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="text-xs text-zinc-400 hover:text-white underline pt-2"
                >
                  {t.contact.bookModify}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-2">1. Choisissez un jour :</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setSelectedDate(d.value)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                          selectedDate === d.value
                            ? "bg-blue-600 text-white font-bold border-blue-500"
                            : "glass-card hover:bg-white/10"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2">2. Choisissez un créneau :</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2 rounded-xl border text-xs font-mono font-medium transition-all ${
                          selectedSlot === slot
                            ? "bg-blue-600 text-white font-bold border-blue-500"
                            : "glass-card hover:bg-white/10"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {!bookingConfirmed && (
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setBookingConfirmed(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.contact.bookConfirmBtn} ({selectedDate.split(" ")[0]} {selectedSlot})</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* 3. Frequently Asked Questions (FAQ) Accordion */}
      <div className="pt-12 border-t border-white/10 space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-blue-500 text-xs font-semibold uppercase tracking-wider font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t.contact.faqTitle}
          </h2>
          <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-zinc-400" : "text-slate-500"}`}>
            {t.contact.faqSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden transition-colors border"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base"
                >
                  <span className={isOpen ? "text-blue-500" : ""}>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-blue-500" : "text-zinc-400"}`} />
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3 ${
                    theme === "dark" ? "text-zinc-300" : "text-slate-600"
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
