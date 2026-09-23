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
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { Language, ThemeMode } from "../types";
import { useTranslation } from "../data/translations";
import { getFaq } from "../data/portfolioData";
import { getSiteSettings } from "../data/contentStore";
import { SEO } from "./SEO"; // <-- IMPORT DU COMPOSANT SEO

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

  // Nettoyage / Assainissement des entrées (Protection XSS & Injection)
  const sanitizeInput = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Automatisation & IA");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState(prefilledMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState("");

  // Booking Calendar State
  const isFr = language === "fr";
  const [selectedDate, setSelectedDate] = useState(isFr ? "Mardi 6 Octobre 2026" : "Tuesday, October 6, 2026");
  const [selectedSlot, setSelectedSlot] = useState("14:30");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  // Mettre à jour la date par défaut en cas de changement de langue
  useEffect(() => {
    setSelectedDate(isFr ? "Mardi 6 Octobre 2026" : "Tuesday, October 6, 2026");
  }, [isFr]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validation des données côté client
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError(isFr ? "Veuillez remplir tous les champs obligatoires." : "Please fill in all required fields.");
      return;
    }

    // Assainissement des données saisies
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      projectType: sanitizeInput(projectType),
      budget: sanitizeInput(budget),
      message: sanitizeInput(message),
      _replyto: sanitizeInput(email),
      _subject: `Nouveau message de ${sanitizeInput(name)} - Portfolio`
    };

    setIsSubmitting(true);

    try {
      // Envoi sécurisé vers Formspree acheminé vers contact@capinakpado.com
      const response = await fetch("https://formspree.io/f/xknakpado", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(sanitizedData)
      });

      if (response.ok) {
        setIsSent(true);
        setName("");
        setEmail("");
        setPhone("");
        setBudget("");
        setMessage("");
      } else {
        setFormError(
          isFr 
            ? "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou m'écrire directement à contact@capinakpado.com." 
            : "An error occurred. Please try again or email contact@capinakpado.com directly."
        );
      }
    } catch (error) {
      setFormError(
        isFr 
          ? "Impossible d'envoyer le message. Vérifiez votre connexion internet." 
          : "Failed to send message. Please check your internet connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDates = isFr
    ? [
        { label: "Mardi 6 Octobre", value: "Mardi 6 Octobre 2026" },
        { label: "Mercredi 7 Octobre", value: "Mercredi 7 Octobre 2026" },
        { label: "Jeudi 8 Octobre", value: "Jeudi 8 Octobre 2026" },
        { label: "Vendredi 9 Octobre", value: "Vendredi 9 Octobre 2026" },
      ]
    : [
        { label: "Tuesday Oct 6", value: "Tuesday, October 6, 2026" },
        { label: "Wednesday Oct 7", value: "Wednesday, October 7, 2026" },
        { label: "Thursday Oct 8", value: "Thursday, October 8, 2026" },
        { label: "Friday Oct 9", value: "Friday, October 9, 2026" },
      ];

  const availableSlots = ["09:30", "11:00", "14:30", "16:00", "17:30"];

  return (
    <div id="contact-page" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* BALISE SEO POUR CONTACT */}
      <SEO 
        title={language === "fr" ? "Contact & Réservation | Capin Akpado" : "Contact & Booking | Capin Akpado"}
        description={language === "fr" 
          ? "Contactez-moi pour discuter de votre projet de développement web, mobile ou d'automatisation IA. Réservez un appel de découverte gratuit." 
          : "Contact me to discuss your web, mobile development, or AI automation project. Book a free discovery call."}
        language={language}
        url={`https://capinakpado.com/${language}/contact`}
      />

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
          {(isFr ? siteSettings.contactPitchFr : siteSettings.contactPitchEn) || t.contact.desc}
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
              {formError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Astride Windya"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">{t.contact.emailLabel}</label>
                  <input
                    type="email"
                    required
                    maxLength={120}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="astride@entreprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">{t.contact.phoneLabel}</label>
                  <input
                    type="tel"
                    maxLength={30}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+229 01 12 34 56 78"
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
                    <option value="Automatisation & IA">{isFr ? "Automatisation & IA" : "Automation & AI"}</option>
                    <option value="Site Web & Plateforme">{isFr ? "Site Web & Plateforme" : "Web Site & Platform"}</option>
                    <option value="Application Mobile">{isFr ? "Application Mobile" : "Mobile App"}</option>
                    <option value="Autre / Conseil">{isFr ? "Autre / Conseil Stratégique" : "Other / Strategic Consulting"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">{t.contact.budgetLabel}</label>
                <input
                  type="text"
                  maxLength={50}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder={isFr ? "Ex: 2 500 €, A discuter, ~5 000 $" : "Ex: $2,500, Flexible, ~$5,000"}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">{t.contact.messageLabel}</label>
                <textarea
                  required
                  rows={4}
                  maxLength={3000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isFr ? "Décrivez votre besoin ou collez le diagnostic généré..." : "Describe your project or paste the generated diagnostic..."}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all border border-white/20 disabled:opacity-50"
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
                {isFr ? "Visio 15 min" : "15-min Call"}
              </span>
              <span className="text-xs font-mono text-emerald-500 font-bold">
                {isFr ? "100% Gratuit" : "100% Free"}
              </span>
            </div>

            <div>
              <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {t.contact.bookTitle}
              </h2>
              <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-slate-500"} mt-1`}>
                {t.contact.bookDesc}
              </p>
            </div>

            {/* Calendly Direct Link Option */}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all flex items-center justify-between text-xs font-semibold group"
            >
              <span>{isFr ? "Réserver directement sur Calendly" : "Book directly on Calendly"}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Notice regarding slot availability */}
            <p className="text-[11px] text-amber-500/90 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                {isFr 
                  ? "Note : Les créneaux ci-dessous sont indicatifs et sous réserve de confirmation selon la disponibilité réelle de mon agenda."
                  : "Note: The time slots below are indicative and subject to confirmation based on real-time schedule availability."}
              </span>
            </p>

            {bookingConfirmed ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-emerald-500 text-sm">{t.contact.bookConfirmedTitle}</h4>
                <p className={`text-xs ${theme === "dark" ? "text-zinc-200" : "text-slate-700"}`}>
                  {t.contact.bookConfirmedDesc} <br />
                  <strong className="text-blue-500 font-mono">{selectedDate} {isFr ? "à" : "at"} {selectedSlot}</strong>
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
                  <label className="block font-semibold mb-2">
                    {isFr ? "1. Choisissez un jour :" : "1. Select a day:"}
                  </label>
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
                  <label className="block font-semibold mb-2">
                    {isFr ? "2. Choisissez un créneau :" : "2. Select a time slot:"}
                  </label>
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
                <span>
                  {t.contact.bookConfirmBtn} ({selectedDate.split(" ")[0]} {selectedSlot})
                </span>
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