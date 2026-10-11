import React from "react";
import { Language, ThemeMode, PageView } from "../types";
import { SEO } from "./SEO";

interface NewsletterGuideProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageView) => void;
}

export const NewsletterGuide: React.FC<NewsletterGuideProps> = ({
  language,
  theme,
}) => {
  const isDark = theme === "dark";

  return (
    <div
      id="guide-ia-pro-page"
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-black text-zinc-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <SEO
        title={
          language === "fr"
            ? "Guide IA Pro de l'entrepreneur : À venir | Capin Akpado"
            : "AI Pro Entrepreneur's Guide: Coming Soon | Capin Akpado"
        }
        description={
          language === "fr"
            ? "Le Guide IA Pro de l'entrepreneur sera bientôt disponible."
            : "The AI Pro Entrepreneur's Guide will be available soon."
        }
        language={language}
        url={`https://capinakpado.com/${language}/guide-ia-pro`}
      />

      <section className="w-full max-w-3xl mx-auto text-center">
        <div
          className={`relative overflow-hidden rounded-3xl border p-10 sm:p-16 shadow-2xl ${
            isDark
              ? "bg-zinc-900/80 border-zinc-800 shadow-blue-950/20"
              : "bg-white border-slate-200 shadow-slate-200/60"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>{language === "fr" ? "À venir" : "Coming soon"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {language === "fr" ? (
                <>
                  Guide IA Pro de l'entrepreneur
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400">
                    À venir
                  </span>
                </>
              ) : (
                <>
                  AI Pro Entrepreneur's Guide
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400">
                    Coming Soon
                  </span>
                </>
              )}
            </h1>

            <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
              {language === "fr"
                ? "Le contenu du Guide IA Pro de l'entrepreneur est actuellement en préparation. Revenez bientôt pour découvrir la nouvelle newsletter."
                : "The AI Pro Entrepreneur's Guide is currently being prepared. Check back soon to discover the new newsletter."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

/*
 * ============================================================================
 * ANCIEN CONTENU DE LA PAGE — CONSERVÉ EN COMMENTAIRES POUR UNE UTILISATION
 * ULTÉRIEURE LORS DE LA CONCEPTION DE LA NEWSLETTER
 * ============================================================================
 */

// import React, { useState } from "react";
// import {
//   BookOpen,
//   Sparkles,
//   CheckCircle2,
//   Mail,
//   User,
//   Briefcase,
//   ArrowRight,
//   ShieldCheck,
//   Zap,
//   TrendingUp,
//   Award,
//   Layers,
//   FileText,
//   Clock,
//   ExternalLink,
//   ChevronDown,
//   ChevronUp,
//   Download,
//   GraduationCap,
//   MessageSquare,
//   Lock,
//   Receipt,
//   Check,
//   CreditCard,
// } from "lucide-react";
// import { Language, ThemeMode, PageView } from "../types";
// import { useTranslation } from "../data/translations";
// import { saveNewsletterSubscriber, getSiteSettings } from "../data/contentStore";
// import { SEO } from "./SEO"; // <-- IMPORT DU COMPOSANT SEO
// 
// interface NewsletterGuideProps {
//   language: Language;
//   theme: ThemeMode;
//   onNavigate: (page: PageView) => void;
// }
// 
// export const NewsletterGuide: React.FC<NewsletterGuideProps> = ({
//   language,
//   theme,
//   onNavigate,
// }) => {
//   const t = useTranslation(language);
//   const guide = t.guideIaPro;
//   const settings = getSiteSettings();
// 
//   const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [openFaq, setOpenFaq] = useState<number | null>(0);
// 
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !email.includes("@")) {
//       setErrorMessage(
//         language === "fr"
//           ? "Veuillez renseigner une adresse email valide."
//           : "Please enter a valid email address."
//       );
//       setStatus("error");
//       return;
//     }
// 
//     setStatus("loading");
//     setErrorMessage("");
// 
//     setTimeout(() => {
//       try {
//         saveNewsletterSubscriber({
//           email: email.trim(),
//           name: name.trim() || undefined,
//           businessType: role.trim() || undefined,
//           source: `newsletter_paid_${selectedPlan}`,
//         });
//         setStatus("success");
//       } catch {
//         setStatus("error");
//         setErrorMessage(
//           language === "fr"
//             ? "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer."
//             : "An error occurred during registration. Please try again."
//         );
//       }
//     }, 600);
//   };
// 
//   const isDark = theme === "dark";
// 
//   return (
//     <div
//       id="guide-ia-pro-page"
//       className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
//         isDark ? "bg-black text-zinc-100" : "bg-slate-50 text-slate-900"
//       }`}
//     >
//       
//       {/* BALISE SEO POUR LE GUIDE IA PRO */}
//       <SEO 
//         title={language === "fr" ? "Le Guide IA Pro | Capin Akpado" : "The AI Pro Guide | Capin Akpado"}
//         description={language === "fr" 
//           ? "Abonnez-vous au Guide IA Pro pour recevoir des stratégies concrètes sur l'intelligence artificielle, l'automatisation et le développement web pour votre entreprise." 
//           : "Subscribe to the AI Pro Guide to receive actionable strategies on artificial intelligence, automation, and web development for your business."}
//         language={language}
//         url={`https://capinakpado.com/${language}/guide-ia-pro`}
//       />
// 
//       <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
//         
//         {/* ================= HERO SECTION ================= */}
//         <section className="relative pt-6 sm:pt-10 text-center space-y-6 max-w-4xl mx-auto">
//           {/* Subtle Ambient Glow */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full pointer-events-none -z-10" />
// 
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-blue-500/10 text-blue-500 border border-blue-500/25">
//             <Lock className="w-3.5 h-3.5" />
//             <span>{guide.badge}</span>
//           </div>
// 
//           {/* Main Title */}
//           <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
//             {language === "fr" ? (
//               <>
//                 Le Guide IA Pro <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400">
//                   de l'Entrepreneur
//                 </span>
//               </>
//             ) : (
//               <>
//                 The AI Pro <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400">
//                   Entrepreneur's Guide
//                 </span>
//               </>
//             )}
//           </h1>
// 
//           {/* Pitch Subtitle */}
//           <p
//             className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${
//               isDark ? "text-zinc-300" : "text-slate-700"
//             }`}
//           >
//             {guide.subtitle}
//           </p>
// 
//           {/* Social Proof & Cadence Chips */}
//           <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium">
//             <span
//               className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
//                 isDark
//                   ? "bg-zinc-900/80 border-zinc-800 text-zinc-300"
//                   : "bg-white border-slate-200 text-slate-700 shadow-sm"
//               }`}
//             >
//               <Award className="w-4 h-4 text-amber-500" />
//               {guide.subscriberCount}
//             </span>
//             <span
//               className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
//                 isDark
//                   ? "bg-zinc-900/80 border-zinc-800 text-zinc-300"
//                   : "bg-white border-slate-200 text-slate-700 shadow-sm"
//               }`}
//             >
//               <Clock className="w-4 h-4 text-blue-500" />
//               {guide.frequency}
//             </span>
//             <span
//               className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
//                 isDark
//                   ? "bg-zinc-900/80 border-zinc-800 text-emerald-400"
//                   : "bg-white border-slate-200 text-emerald-600 shadow-sm"
//               }`}
//             >
//               <Receipt className="w-4 h-4" />
//               {language === "fr" ? "100% Frais Déductibles" : "100% Tax Deductible"}
//             </span>
//           </div>
//         </section>
// 
//         {/* ================= PRICING & SUBSCRIPTION BOX ================= */}
//         <section className="max-w-4xl mx-auto space-y-8">
//           
//           {/* Plan Selection Toggles */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Monthly Option */}
//             <div
//               onClick={() => setSelectedPlan("monthly")}
//               className={`relative p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all ${
//                 selectedPlan === "monthly"
//                   ? isDark
//                     ? "bg-blue-950/30 border-blue-500 ring-2 ring-blue-500/50"
//                     : "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/30"
//                   : isDark
//                   ? "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
//                   : "bg-white border-slate-200 hover:border-slate-300"
//               }`}
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="font-bold text-base sm:text-lg">{guide.pricingMonthlyTitle}</h3>
//                   <p className={`text-xs mt-1 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
//                     {guide.pricingMonthlyDesc}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-2xl sm:text-3xl font-extrabold text-blue-500">
//                     {guide.pricingMonthlyPrice}
//                   </span>
//                   <span className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
//                     {guide.pricingMonthlyPeriod}
//                   </span>
//                 </div>
//               </div>
//             </div>
// 
//             {/* Annual Option (Recommended) */}
//             <div
//               onClick={() => setSelectedPlan("annual")}
//               className={`relative p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all ${
//                 selectedPlan === "annual"
//                   ? isDark
//                     ? "bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10"
//                     : "bg-blue-50 border-blue-500 ring-2 ring-blue-500/30 shadow-md shadow-blue-500/10"
//                   : isDark
//                   ? "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
//                   : "bg-white border-slate-200 hover:border-slate-300"
//               }`}
//             >
//               <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
//                 {guide.pricingBadgeBest}
//               </div>
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="font-bold text-base sm:text-lg flex items-center gap-1.5">
//                     <span>{guide.pricingAnnualTitle}</span>
//                   </h3>
//                   <p className={`text-xs mt-1 font-medium ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
//                     {guide.pricingAnnualDesc}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-2xl sm:text-3xl font-extrabold text-blue-500">
//                     {guide.pricingAnnualPrice}
//                   </span>
//                   <span className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
//                     {guide.pricingAnnualPeriod}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
// 
//           {/* Core Features Included in Paid Subscription */}
//           <div
//             className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border ${
//               isDark ? "bg-zinc-900/70 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
//             }`}
//           >
//             <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-blue-500 mb-4 flex items-center gap-2">
//               <Sparkles className="w-4 h-4" />
//               <span>{language === "fr" ? "Ce qui est inclus dans votre abonnement privé :" : "Included in your private membership:"}</span>
//             </h3>
//             <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
//               {guide.includedFeatures?.map((feat: string, idx: number) => (
//                 <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
//                   <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
//                   <span className={isDark ? "text-zinc-300" : "text-slate-700"}>{feat}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
// 
//           {/* Subscription Checkout / Form Box */}
//           <div
//             className={`relative rounded-2xl sm:rounded-3xl border p-6 sm:p-10 shadow-2xl transition-all ${
//               isDark
//                 ? "bg-zinc-900/90 border-blue-500/30 shadow-blue-950/20"
//                 : "bg-white border-blue-200 shadow-blue-100"
//             }`}
//           >
//             {/* Header / Gift callout */}
//             <div className="text-center space-y-2 pb-6 border-b border-white/10">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
//                 <Sparkles className="w-3.5 h-3.5" />
//                 <span>{guide.bonusGiftTitle}</span>
//               </div>
//               <p className="text-xs sm:text-sm font-medium text-blue-500">
//                 {guide.bonusGiftDesc}
//               </p>
//             </div>
// 
//             {status === "success" ? (
//               <div className="pt-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
//                 <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
//                   <CheckCircle2 className="w-8 h-8" />
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-xl sm:text-2xl font-bold">{guide.successTitle}</h3>
//                   <p className={`text-sm max-w-md mx-auto ${isDark ? "text-zinc-300" : "text-slate-600"}`}>
//                     {guide.successDesc}
//                   </p>
//                 </div>
//                 <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
//                   <button
//                     onClick={() => {
//                       setStatus("idle");
//                       setEmail("");
//                     }}
//                     className={`text-xs px-4 py-2 rounded-xl border ${
//                       isDark ? "border-zinc-700 hover:bg-zinc-800 text-zinc-300" : "border-slate-300 hover:bg-slate-100 text-slate-700"
//                     }`}
//                   >
//                     {language === "fr" ? "Souscrire pour une autre équipe" : "Subscribe another team member"}
//                   </button>
//                   <button
//                     onClick={() => onNavigate("services")}
//                     className="text-xs px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1.5"
//                   >
//                     <span>{language === "fr" ? "Explorer les Services" : "Explore Services"}</span>
//                     <ArrowRight className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="pt-6 space-y-4">
//                 {errorMessage && (
//                   <div className="p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500">
//                     {errorMessage}
//                   </div>
//                 )}
// 
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {/* Name field */}
//                   <div className="space-y-1.5">
//                     <label className={`text-xs font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
//                       {language === "fr" ? "Prénom & Nom *" : "Full Name *"}
//                     </label>
//                     <div className="relative">
//                       <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
//                       <input
//                         type="text"
//                         required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder={guide.namePlaceholder}
//                         className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           isDark
//                             ? "bg-zinc-800/80 border-zinc-700 text-white placeholder:text-zinc-500"
//                             : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
//                         }`}
//                       />
//                     </div>
//                   </div>
// 
//                   {/* Role field */}
//                   <div className="space-y-1.5">
//                     <label className={`text-xs font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
//                       {language === "fr" ? "Entreprise / Rôle *" : "Company / Role *"}
//                     </label>
//                     <div className="relative">
//                       <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
//                       <input
//                         type="text"
//                         required
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                         placeholder={guide.rolePlaceholder}
//                         className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                           isDark
//                             ? "bg-zinc-800/80 border-zinc-700 text-white placeholder:text-zinc-500"
//                             : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
//                         }`}
//                       />
//                     </div>
//                   </div>
//                 </div>
// 
//                 {/* Email field */}
//                 <div className="space-y-1.5">
//                   <label className={`text-xs font-semibold ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
//                     {language === "fr" ? "Email Professionnel (réception des éditions & factures) *" : "Professional Email (briefings & invoices) *"}
//                   </label>
//                   <div className="relative">
//                     <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
//                     <input
//                       type="email"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder={guide.emailPlaceholder}
//                       className={`w-full pl-10 pr-3.5 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                         isDark
//                           ? "bg-zinc-800/80 border-zinc-700 text-white placeholder:text-zinc-500"
//                           : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
//                       }`}
//                     />
//                   </div>
//                 </div>
// 
//                 {/* Submit button */}
//                 <button
//                   type="submit"
//                   disabled={status === "loading"}
//                   className="w-full mt-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
//                 >
//                   {status === "loading" ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       <span>{guide.subscribing}</span>
//                     </>
//                   ) : (
//                     <>
//                       <CreditCard className="w-4 h-4" />
//                       <span>
//                         {guide.subscribeBtn} — {selectedPlan === "annual" ? guide.pricingAnnualPrice : guide.pricingMonthlyPrice}
//                       </span>
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
// 
//                 {/* Trust guarantee */}
//                 <div className="pt-2 flex items-center justify-center gap-2 text-center text-[11px] text-zinc-400">
//                   <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
//                   <span>{guide.guarantee}</span>
//                 </div>
//               </form>
//             )}
//           </div>
//         </section>
// 
//         {/* ================= 4 PILLARS SECTION ================= */}
//         <section className="space-y-10">
//           <div className="text-center space-y-3 max-w-2xl mx-auto">
//             <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//               {guide.whySubscribeTitle}
//             </h2>
//             <p className={`text-sm sm:text-base ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
//               {guide.whySubscribeDesc}
//             </p>
//           </div>
// 
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {guide.pillars.map((pillar: { title: string; desc: string }, idx: number) => {
//               const icons = [
//                 <TrendingUp key="0" className="w-6 h-6 text-blue-500" />,
//                 <Zap key="1" className="w-6 h-6 text-amber-500" />,
//                 <Layers key="2" className="w-6 h-6 text-cyan-500" />,
//                 <ShieldCheck key="3" className="w-6 h-6 text-emerald-500" />,
//               ];
// 
//               return (
//                 <div
//                   key={idx}
//                   className={`p-6 sm:p-8 rounded-2xl border transition-all ${
//                     isDark
//                       ? "bg-zinc-900/60 border-zinc-800/80 hover:border-blue-500/40"
//                       : "bg-white border-slate-200 hover:border-blue-400 shadow-sm"
//                   }`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div
//                       className={`p-3 rounded-xl shrink-0 ${
//                         isDark ? "bg-zinc-800" : "bg-slate-100"
//                       }`}
//                     >
//                       {icons[idx % icons.length]}
//                     </div>
//                     <div className="space-y-2">
//                       <h3 className="text-lg font-bold">{pillar.title}</h3>
//                       <p
//                         className={`text-sm leading-relaxed ${
//                           isDark ? "text-zinc-400" : "text-slate-600"
//                         }`}
//                       >
//                         {pillar.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
// 
//         {/* ================= SAMPLE EDITIONS PREVIEW ================= */}
//         <section className="space-y-8">
//           <div className="text-center space-y-2 max-w-2xl mx-auto">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-500 border border-blue-500/20">
//               <FileText className="w-3.5 h-3.5" />
//               <span>{guide.sampleEditionsTitle}</span>
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//               {guide.sampleEditionsSubtitle}
//             </h2>
//           </div>
// 
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {guide.samples.map((sample: { tag: string; title: string; summary: string; readTime?: string }, idx: number) => (
//               <div
//                 key={idx}
//                 className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
//                   isDark
//                     ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
//                     : "bg-white border-slate-200 hover:border-blue-300 shadow-sm"
//                 }`}
//               >
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between text-xs">
//                     <span className="px-2.5 py-0.5 rounded-full font-mono font-medium bg-blue-500/10 text-blue-500">
//                       {sample.tag}
//                     </span>
//                     {sample.readTime && (
//                       <span className="text-zinc-400 flex items-center gap-1 font-mono text-[11px]">
//                         <Clock className="w-3 h-3" />
//                         {sample.readTime}
//                       </span>
//                     )}
//                   </div>
//                   <h4 className="font-bold text-base leading-snug">
//                     {sample.title}
//                   </h4>
//                   <p
//                     className={`text-xs leading-relaxed ${
//                       isDark ? "text-zinc-400" : "text-slate-600"
//                     }`}
//                   >
//                     {sample.summary}
//                   </p>
//                 </div>
// 
//                 <div className="pt-4 mt-4 border-t border-white/5">
//                   <span className="text-xs font-medium text-blue-500 inline-flex items-center gap-1">
//                     <span>{language === "fr" ? "Réservé aux membres abonnés" : "Subscribers only"}</span>
//                     <Lock className="w-3.5 h-3.5 text-blue-400" />
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
// 
//         {/* ================= AUTHOR BIO ================= */}
//         <section
//           className={`p-8 sm:p-12 rounded-3xl border ${
//             isDark
//               ? "bg-gradient-to-br from-zinc-900 to-black border-zinc-800"
//               : "bg-gradient-to-br from-white to-slate-100 border-slate-200 shadow-sm"
//           }`}
//         >
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl shadow-blue-600/30 shrink-0 border-2 border-white/20">
//               CA
//             </div>
//             <div className="space-y-3 text-center md:text-left flex-1">
//               <div className="space-y-1">
//                 <h3 className="text-xl sm:text-2xl font-bold">{guide.authorTitle}</h3>
//                 <p className="text-xs sm:text-sm font-mono text-blue-500 font-semibold">
//                   {settings.authorRoleFr || guide.authorRole}
//                 </p>
//               </div>
//               <p
//                 className={`text-sm leading-relaxed max-w-2xl ${
//                   isDark ? "text-zinc-300" : "text-slate-700"
//                 }`}
//               >
//                 {guide.authorBio}
//               </p>
//               <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
//                 <button
//                   onClick={() => onNavigate("about")}
//                   className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-colors ${
//                     isDark
//                       ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
//                       : "border-slate-300 text-slate-700 hover:bg-slate-200"
//                   }`}
//                 >
//                   {language === "fr" ? "Parcours complet de Capin →" : "Capin's full background →"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
// 
//         {/* ================= ADVISORY & FORMATION CTA ================= */}
//         <section
//           className={`relative rounded-3xl p-8 sm:p-12 overflow-hidden border text-center space-y-6 ${
//             isDark
//               ? "bg-blue-950/40 border-blue-500/30 text-white"
//               : "bg-blue-50 border-blue-200 text-slate-900"
//           }`}
//         >
//           <div className="max-w-2xl mx-auto space-y-3">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/20 text-blue-500 border border-blue-500/30">
//               <GraduationCap className="w-3.5 h-3.5" />
//               <span>{language === "fr" ? "Accompagnement & Ateliers" : "Consulting & Workshops"}</span>
//             </div>
//             <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
//               {guide.advisoryTitle}
//             </h2>
//             <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
//               {guide.advisoryDesc}
//             </p>
//           </div>
// 
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
//             <button
//               onClick={() => onNavigate("contact")}
//               className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
//             >
//               <MessageSquare className="w-4 h-4" />
//               <span>{guide.advisoryBtn}</span>
//             </button>
//             <button
//               onClick={() => onNavigate("services")}
//               className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border text-sm font-semibold transition-all ${
//                 isDark
//                   ? "bg-zinc-900/80 border-zinc-700 hover:bg-zinc-800 text-zinc-200"
//                   : "bg-white border-slate-300 hover:bg-slate-100 text-slate-800"
//               }`}
//             >
//               {guide.servicesBtn}
//             </button>
//           </div>
//         </section>
// 
//         {/* ================= FAQ SECTION ================= */}
//         <section className="max-w-3xl mx-auto space-y-8">
//           <div className="text-center space-y-2">
//             <h3 className="text-2xl font-bold">{guide.faqTitle}</h3>
//           </div>
// 
//           <div className="space-y-4">
//             {guide.faq.map((item: { q: string; a: string }, idx: number) => {
//               const isOpen = openFaq === idx;
//               return (
//                 <div
//                   key={idx}
//                   className={`rounded-2xl border transition-all overflow-hidden ${
//                     isDark
//                       ? "bg-zinc-900/60 border-zinc-800"
//                       : "bg-white border-slate-200 shadow-sm"
//                   }`}
//                 >
//                   <button
//                     onClick={() => setOpenFaq(isOpen ? null : idx)}
//                     className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base cursor-pointer"
//                   >
//                     <span>{item.q}</span>
//                     {isOpen ? (
//                       <ChevronUp className="w-4 h-4 text-blue-500 shrink-0" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
//                     )}
//                   </button>
//                   {isOpen && (
//                     <div
//                       className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed ${
//                         isDark ? "text-zinc-400" : "text-slate-600"
//                       }`}
//                     >
//                       {item.a}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </section>
// 
//       </div>
//     </div>
//   );
// };
