import { RESTAURANT_CONFIG } from "../data";
import { Phone, Mail, MapPin, Compass, Clock, ShieldAlert, Instagram, Facebook } from "lucide-react";

interface FooterProps {
  onPageChange: (page: string) => void;
  onOpenBooking: () => void;
  onOpenLegal: (doc: "privacy" | "cookie" | "terms" | "allergens" | "legal") => void;
}

export default function Footer({ onPageChange, onOpenBooking, onOpenLegal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="logo.png"
                alt={`${RESTAURANT_CONFIG.name} Logo`}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans pr-4">
              Cucina asiatica contemporanea nel cuore di Foggia. Esperienza culinaria d'eccellenza, formula All You Can Eat e ospitalità per tutta la famiglia.
            </p>
            <div className="flex items-center gap-2 pt-1.5">
              {RESTAURANT_CONFIG.instagramUrl && (
                <a 
                  href={RESTAURANT_CONFIG.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-neutral-900 hover:bg-neutral-850 hover:text-pink-500 rounded-lg border border-neutral-800 hover:border-pink-500/20 transition-all"
                  title="Seguici su Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {RESTAURANT_CONFIG.facebookUrl && (
                <a 
                  href={RESTAURANT_CONFIG.facebookUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-neutral-900 hover:bg-neutral-850 hover:text-blue-500 rounded-lg border border-neutral-800 hover:border-blue-500/20 transition-all"
                  title="Seguici su Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links & GEO/SEO Scope */}
          <div>
            <h3 className="text-white font-sans font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              Area di Servizio
            </h3>
            <p className="text-xs text-neutral-500 mb-3 leading-relaxed">
              Il punto di riferimento per il sushi di qualità a Foggia e provincia. Consegniamo a domicilio e offriamo servizio asporto nei seguenti comuni:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {RESTAURANT_CONFIG.areaServed.map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-[11px] font-sans hover:border-amber-500/40 hover:text-white transition-all cursor-default"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Hours & Booking Shortcut */}
          <div>
            <h3 className="text-white font-sans font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Orari di Apertura
            </h3>
            <ul className="space-y-2 text-[11px]">
              {RESTAURANT_CONFIG.hours.daily?.map((d) => (
                <li key={d.day} className="flex justify-between items-start pb-1 border-b border-neutral-900/40">
                  <span className="font-medium text-neutral-300">{d.day}</span>
                  <div className="text-right text-neutral-100 font-mono text-[11px] font-medium tracking-wide">
                    {d.shifts.map((shift, idx) => (
                      <p key={idx} className="leading-tight">{shift}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Direct Contacts */}
          <div>
            <h3 className="text-white font-sans font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Contatti & Sede
            </h3>
            <ul className="space-y-3.5 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a
                  href={`tel:${RESTAURANT_CONFIG.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {RESTAURANT_CONFIG.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator line */}
        <hr className="border-neutral-900 mb-8" />

        {/* Bottom Bar: Legal & Copyrights */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-xs text-neutral-500 text-center lg:text-left">
            <p>&copy; {currentYear} {RESTAURANT_CONFIG.name} Foggia. Tutti i diritti riservati.</p>
            <p className="text-[10px] text-neutral-600 mt-1">
              Cucina Giapponese, Sushi & Asian Fusion Premium. All You Can Eat & Kid Friendly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-neutral-500">
            <button onClick={() => onOpenLegal("privacy")} className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onOpenLegal("cookie")} className="hover:text-amber-500 transition-colors">
              Cookie Policy
            </button>
            <button onClick={() => onOpenLegal("terms")} className="hover:text-amber-500 transition-colors">
              Termini e Condizioni
            </button>
            <button onClick={() => onOpenLegal("allergens")} className="hover:text-amber-500 transition-colors flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Allergeni
            </button>
            <button onClick={() => onOpenLegal("legal")} className="hover:text-amber-500 transition-colors">
              Note Legali
            </button>
          </div>
        </div>

        {/* Powered by Socialee Section */}
        <div className="mt-8 pt-8 border-t border-neutral-900/60 flex flex-col items-center justify-center gap-3.5 text-center">
          <div className="flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-xl border border-neutral-900/50">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Powered by</span>
            <img 
              src="logo-socialee.png" 
              alt="Socialee Logo" 
              className="h-5 w-auto object-contain brightness-95 hover:brightness-100 transition-all"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <span className="text-xs font-semibold text-neutral-300">Socialee</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-6 text-[11px] text-neutral-400">
            <a href="tel:+393281230265" className="hover:text-white transition-colors flex items-center gap-1.5 font-mono">
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>+39 328 123 0265</span>
            </a>
            <span className="text-neutral-800 hidden sm:inline">•</span>
            <a href="mailto:info@socialee.it" className="hover:text-white transition-colors flex items-center gap-1.5 font-mono">
              <Mail className="w-3.5 h-3.5 text-neutral-500" />
              <span>info@socialee.it</span>
            </a>
            <span className="text-neutral-800 hidden sm:inline">•</span>
            <a 
              href="https://www.instagram.com/socialee.it/" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5 text-neutral-500 hover:text-amber-500 transition-all" />
              <span className="font-sans font-medium">@socialee.it</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
