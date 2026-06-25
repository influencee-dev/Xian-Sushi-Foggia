import React, { useState } from "react";
import { BookingDetails, RestaurantConfig } from "../types";
import { RESTAURANT_CONFIG } from "../data";
import { Calendar, Users, Phone, User, MessageSquare, Clock, Check, X } from "lucide-react";

interface BookingFormProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export default function BookingForm({ isModal = false, onCloseModal }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingDetails>({
    fullName: "",
    phone: "",
    guestsCount: 2,
    date: "",
    timeSlot: "Cena 20:30",
    notes: "",
  });

  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const timeOptions = [
    "Pranzo 12:00",
    "Pranzo 12:30",
    "Pranzo 13:00",
    "Pranzo 13:30",
    "Cena 19:30",
    "Cena 20:00",
    "Cena 20:30",
    "Cena 21:00",
    "Cena 21:30",
  ];

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Il nome è obbligatorio.";
    if (!formData.phone.trim()) tempErrors.phone = "Il numero di telefono è obbligatorio.";
    if (!formData.date) tempErrors.date = "La data è obbligatoria.";
    if (!formData.timeSlot) tempErrors.timeSlot = "La fascia oraria è obbligatoria.";
    if (formData.guestsCount < 1) tempErrors.guestsCount = "Almeno 1 persona.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSummary(true);
    }
  };

  const handleSendToWhatsApp = () => {
    // Save to Brevo list 45
    fetch("/api/brevo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.fullName,
        phone: formData.phone,
        type: "booking",
        details: {
          guestsCount: formData.guestsCount,
          date: formData.date,
          timeSlot: formData.timeSlot,
          notes: formData.notes,
        },
      }),
    }).catch((err) => console.error("Error sending to Brevo:", err));

    const message = `Ciao, vorrei prenotare un tavolo.

Nome: ${formData.fullName}
Telefono: ${formData.phone}
Persone: ${formData.guestsCount}
Giorno: ${formData.date}
Fascia oraria: ${formData.timeSlot}
Note: ${formData.notes || "Nessuna"}`;

    const encodedMessage = encodeURIComponent(message);
    const cleanWhatsapp = RESTAURANT_CONFIG.whatsapp.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setShowSummary(false);
    if (isModal && onCloseModal) {
      onCloseModal();
    }
  };

  return (
    <div className={`relative ${isModal ? "" : "max-w-2xl mx-auto"}`}>
      {/* Heading block when rendered inline */}
      {!isModal && (
        <div className="text-center mb-10">
          <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-2">
            PRENOTAZIONI INSTANTANEE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans text-white tracking-tight">
            Prenota il tuo tavolo <span className="text-amber-500">.</span>
          </h2>
          <div className="h-0.5 w-12 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-neutral-400 mt-4 text-sm max-w-md mx-auto">
            Scegli giorno, orario e numero di persone. La richiesta verrà inviata direttamente su WhatsApp al locale.
          </p>
        </div>
      )}

      {/* Main form card container */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {isModal && (
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-sans text-white font-semibold">
                Prenota un Tavolo
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Invia la tua richiesta istantanea tramite WhatsApp
              </p>
            </div>
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-950 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
                aria-label="Chiudi Modale"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Nome e Cognome *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Esempio: Mario Rossi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-all ${
                    errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/25" : "border-neutral-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25"
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-[11px] mt-1 font-sans">{errors.fullName}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Numero di Telefono *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="tel"
                  placeholder="Esempio: +39 345 6789012"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-all ${
                    errors.phone ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/25" : "border-neutral-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[11px] mt-1 font-sans">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Number of guests */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Persone *
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) || 1 })}
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-all ${
                    errors.guestsCount ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-amber-500/50"
                  }`}
                />
              </div>
              {errors.guestsCount && <p className="text-red-500 text-[11px] mt-1 font-sans">{errors.guestsCount}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Giorno *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-all ${
                    errors.date ? "border-red-500 focus:border-red-500" : "border-neutral-800 focus:border-amber-500/50"
                  }`}
                  style={{ colorScheme: "dark" }}
                />
              </div>
              {errors.date && <p className="text-red-500 text-[11px] mt-1 font-sans">{errors.date}</p>}
            </div>

            {/* Time slot */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Fascia Oraria *
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer"
                >
                  {timeOptions.map((option) => (
                    <option key={option} value={option} className="bg-neutral-900 text-white">
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">▼</div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
              Note ed Esigenze Particolari
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <textarea
                placeholder="Esempio: Seggiolone per bimbi, allergie, preferenza tavolo..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-sans font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 hover:-translate-y-0.5 transition-all text-sm tracking-wider uppercase"
          >
            Verifica e Prenota
          </button>
        </form>
      </div>

      {/* Booking Summary Modal overlay (gorgeous preview) */}
      {showSummary && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-800 max-w-md w-full rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-scale-up">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-sans text-white font-semibold">Riepilogo Richiesta</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Verifica i dati inseriti. Cliccando sotto verrai reindirizzato su WhatsApp per finalizzare.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800/80 rounded-xl p-4 space-y-3.5 mb-6 text-sm font-sans">
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">Ospite:</span>
                <span className="text-white font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">Telefono:</span>
                <span className="text-white font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">Coperti:</span>
                <span className="text-amber-500 font-bold">{formData.guestsCount} persone</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">Data:</span>
                <span className="text-white font-medium">{formData.date}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">Orario:</span>
                <span className="text-white font-medium">{formData.timeSlot}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 mb-1">Note aggiuntive:</span>
                <span className="text-neutral-300 italic text-xs bg-neutral-900 p-2 rounded-lg border border-neutral-800/40">
                  {formData.notes || "Nessuna nota aggiuntiva."}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <button
                onClick={() => setShowSummary(false)}
                className="w-full py-3 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 font-sans font-medium text-xs uppercase tracking-wider rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                Modifica
              </button>
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/10 transition-colors flex items-center justify-center gap-1.5"
              >
                Invia su WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
