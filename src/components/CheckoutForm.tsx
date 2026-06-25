import React, { useState } from "react";
import { CartItem, OrderType, PaymentMethod, CheckoutDetails } from "../types";
import { RESTAURANT_CONFIG } from "../data";
import { ShoppingBag, MapPin, Clock, Phone, User, Clipboard, Check, X, CreditCard, Banknote } from "lucide-react";

interface CheckoutFormProps {
  cart: CartItem[];
  cartTotal: number;
  onClose: () => void;
  onClearCart: () => void;
}

export default function CheckoutForm({
  cart,
  cartTotal,
  onClose,
  onClearCart,
}: CheckoutFormProps) {
  const [details, setDetails] = useState<CheckoutDetails>({
    type: OrderType.TAKEAWAY,
    fullName: "",
    phone: "",
    address: "",
    city: "Foggia",
    paymentMethod: PaymentMethod.CASH,
    pickupTime: "20:00",
    notes: "",
  });

  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const pickupTimes = [
    "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15",
    "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00"
  ];

  const generateOrderCode = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `XIAN-ORDER-2026-${randomNum}`;
  };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!details.fullName.trim()) tempErrors.fullName = "Nome e cognome obbligatori.";
    if (!details.phone.trim()) tempErrors.phone = "Numero di telefono obbligatorio.";
    
    if (details.type === OrderType.DELIVERY) {
      if (!details.address?.trim()) tempErrors.address = "Indirizzo di consegna obbligatorio.";
      if (!details.city?.trim()) tempErrors.city = "Comune di consegna obbligatorio.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const code = generateOrderCode();
    setOrderCode(code);
    setShowConfirmation(true);
  };

  const handleSendToWhatsApp = () => {
    if (!orderCode) return;

    // Save to Brevo list 45
    fetch("/api/brevo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: details.fullName,
        phone: details.phone,
        type: "checkout",
        details: {
          type: details.type,
          total: cartTotal.toFixed(2),
          notes: details.notes,
        },
      }),
    }).catch((err) => console.error("Error sending to Brevo:", err));

    const itemsSummary = cart
      .map((item) => `- ${item.product.name} (x${item.quantity}) - €${(item.product.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const headerText = `🍣 ORDINE RICEVUTO - CODICE: ${orderCode}\n`;
    const typeText = `Tipologia: ${details.type === OrderType.DELIVERY ? "CONSEGNA A DOMICILIO" : "RITIRO DA ASPORTO"}\n`;
    const clientText = `Cliente: ${details.fullName}\nTelefono: ${details.phone}\n`;
    
    let logisticsText = "";
    if (details.type === OrderType.DELIVERY) {
      logisticsText = `Indirizzo di Consegna: ${details.address}, ${details.city}\nMetodo Pagamento: ${details.paymentMethod === PaymentMethod.ONLINE ? "Pagamento con Carta Online" : "Contanti alla Consegna"}\n`;
    } else {
      logisticsText = `Orario Richiesto Ritiro: ${details.pickupTime}\nPagamento: In Sede al Ritiro\n`;
    }

    const noteText = `Note: ${details.notes || "Nessuna nota."}\n`;
    const totalText = `\nPRODOTTI ORDINATI:\n${itemsSummary}\n\nTOTALE ORDINE: €${cartTotal.toFixed(2)}`;

    const message = `${headerText}${typeText}${clientText}${logisticsText}${noteText}${totalText}`;
    const encodedMessage = encodeURIComponent(message);
    const cleanWhatsapp = RESTAURANT_CONFIG.whatsapp.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    // Clean up and close
    onClearCart();
    setShowConfirmation(false);
    onClose();
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-left relative overflow-hidden shadow-2xl animate-scale-up">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-sans text-white font-bold flex items-center gap-2">
            <ShoppingBag className="w-5.5 h-5.5 text-amber-500" />
            Cassa & Checkout
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Completa i dati di ricezione del tuo ordine sushi
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-neutral-400 hover:text-white bg-neutral-950 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-all focus:outline-none"
          aria-label="Chiudi Cassa"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Toggle Order Type (Delivery vs takeaway) */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-neutral-950 border border-neutral-800/80 rounded-xl">
          <button
            type="button"
            onClick={() => setDetails({ ...details, type: OrderType.TAKEAWAY })}
            className={`py-2.5 rounded-lg text-xs font-sans tracking-wider uppercase font-bold transition-all ${
              details.type === OrderType.TAKEAWAY
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/10"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Asporto (Ritiro)
          </button>
          <button
            type="button"
            onClick={() => setDetails({ ...details, type: OrderType.DELIVERY })}
            className={`py-2.5 rounded-lg text-xs font-sans tracking-wider uppercase font-bold transition-all ${
              details.type === OrderType.DELIVERY
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/10"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Consegna (Delivery)
          </button>
        </div>

        {/* Core fields (Common to both) */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Nome e Cognome *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Esempio: Mario Rossi"
                value={details.fullName}
                onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                className={`w-full pl-9 pr-4 py-2.5 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-all ${
                  errors.fullName ? "border-red-500 focus:ring-1 focus:ring-red-500/25" : "border-neutral-800 focus:border-amber-500/50"
                }`}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-[10px] mt-1 font-sans">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Numero di Telefono *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="tel"
                placeholder="Esempio: +39 345 6789012"
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                className={`w-full pl-9 pr-4 py-2.5 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-all ${
                  errors.phone ? "border-red-500 focus:ring-1 focus:ring-red-500/25" : "border-neutral-800 focus:border-amber-500/50"
                }`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-sans">{errors.phone}</p>}
          </div>

          {/* Conditional Layout for DELIVERY */}
          {details.type === OrderType.DELIVERY && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Indirizzo Completo *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Esempio: Via Roma 12, Piano 3"
                      value={details.address || ""}
                      onChange={(e) => setDetails({ ...details, address: e.target.value })}
                      className={`w-full pl-9 pr-4 py-2.5 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none transition-all ${
                        errors.address ? "border-red-500 focus:ring-1 focus:ring-red-500/25" : "border-neutral-800 focus:border-amber-500/50"
                      }`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-[10px] mt-1 font-sans">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Comune *
                  </label>
                  <input
                    type="text"
                    value={details.city || ""}
                    onChange={(e) => setDetails({ ...details, city: e.target.value })}
                    className={`w-full px-4 py-2.5 bg-neutral-950 border rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all ${
                      errors.city ? "border-red-500" : "border-neutral-800"
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-[10px] mt-1 font-sans">{errors.city}</p>}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Metodo di Pagamento *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDetails({ ...details, paymentMethod: PaymentMethod.CASH })}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-semibold tracking-wider uppercase transition-all ${
                      details.paymentMethod === PaymentMethod.CASH
                        ? "bg-amber-500/10 border-amber-500 text-amber-500"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    Contanti
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetails({ ...details, paymentMethod: PaymentMethod.ONLINE })}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-semibold tracking-wider uppercase transition-all ${
                      details.paymentMethod === PaymentMethod.ONLINE
                        ? "bg-amber-500/10 border-amber-500 text-amber-500"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Carta Online
                  </button>
                </div>

                {details.paymentMethod === PaymentMethod.ONLINE && (
                  <div className="mt-3 p-3 bg-neutral-950 border border-amber-500/20 text-neutral-400 text-xs rounded-xl flex items-start gap-2 animate-fade-in leading-relaxed">
                    <span className="text-amber-500 text-sm mt-0.5">ℹ</span>
                    <p>
                      {/* Qui collegare Stripe, Nexi o altro gateway di pagamento. */}
                      <strong>Integrazione futura</strong>: Il gateway di pagamento (Stripe/Nexi/PayPal) verrà collegato qui. Per ora l'ordine verrà inviato e saldato in contanti o POS alla consegna.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Conditional Layout for TAKEAWAY */}
          {details.type === OrderType.TAKEAWAY && (
            <div className="animate-fade-in">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Orario di Ritiro Desiderato *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                <select
                  value={details.pickupTime}
                  onChange={(e) => setDetails({ ...details, pickupTime: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all appearance-none cursor-pointer"
                >
                  {pickupTimes.map((time) => (
                    <option key={time} value={time} className="bg-neutral-900 text-white">
                      {time}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">▼</div>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1.5 leading-normal">
                Pagamento sicuro alla cassa del ristorante con Contanti, bancomat, Apple Pay o Carta di Credito.
              </p>
            </div>
          )}

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Note per l'Ordine (Allergie, Citofono...)
            </label>
            <textarea
              placeholder="Esempio: Citofono Rossi, allergie alimentari, no salsa soia..."
              rows={2}
              value={details.notes}
              onChange={(e) => setDetails({ ...details, notes: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all resize-none font-sans"
            />
          </div>

        </div>

        {/* Order total info */}
        <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl space-y-2 mt-2">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Prodotti ordinati:</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} pezzi</span>
          </div>
          <div className="flex justify-between text-sm text-neutral-200 border-t border-neutral-900 pt-2 font-semibold">
            <span>Totale da Saldare:</span>
            <span className="text-amber-500 font-bold">€{cartTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-sans font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 transition-all text-sm tracking-wider uppercase"
        >
          Conferma Ordine
        </button>

      </form>

      {/* Confirmation Slide-over Modal ("Ordine Ricevuto") */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-800 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative text-center overflow-hidden animate-scale-up">
            
            <div className="w-14 h-14 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/25">
              <Check className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 bg-neutral-950 border border-neutral-800/80 rounded-full text-[10px] font-mono tracking-widest text-amber-500 uppercase block w-max mx-auto mb-1">
              CODICE: {orderCode}
            </span>

            <h3 className="text-2xl font-sans text-white font-bold tracking-tight">Ordine Pronto!</h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Il tuo ordine è stato generato ed è pronto per l'invio su WhatsApp. Clicca sotto per collegarti con lo staff del ristorante e ricevere conferma immediata.
            </p>

            {/* Recipient Details */}
            <div className="bg-neutral-950 border border-neutral-800/60 rounded-xl p-4 my-5 text-left text-xs font-sans space-y-2 max-h-48 overflow-y-auto">
              <p className="text-neutral-500 uppercase font-mono tracking-wider font-bold text-[10px] border-b border-neutral-900 pb-1.5 mb-1.5 flex justify-between">
                <span>Riepilogo Ordine</span>
                <span className="text-amber-500 font-bold">{details.type}</span>
              </p>
              <div className="flex justify-between">
                <span className="text-neutral-500">Destinatario:</span>
                <span className="text-neutral-200 font-medium">{details.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Recapito:</span>
                <span className="text-neutral-200 font-medium">{details.phone}</span>
              </div>
              {details.type === OrderType.DELIVERY ? (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Consegna a:</span>
                  <span className="text-neutral-200 font-medium text-right max-w-[200px] truncate">{details.address}, {details.city}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Orario Ritiro:</span>
                  <span className="text-neutral-200 font-medium">{details.pickupTime}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-neutral-900 pt-1.5 font-bold">
                <span className="text-neutral-400">Importo Totale:</span>
                <span className="text-amber-500 font-bold text-sm">€{cartTotal.toFixed(2)}</span>
              </div>

              {/* Items List */}
              <div className="border-t border-neutral-900 pt-2 mt-2">
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1 font-bold">Lista Piatti:</p>
                <div className="space-y-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-neutral-400 text-[11px]">
                      <span>{item.product.name} <span className="text-neutral-600">x{item.quantity}</span></span>
                      <span>€{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                Invia Ordine su WhatsApp
              </button>
              
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-2.5 text-neutral-400 hover:text-white font-sans text-[11px] uppercase tracking-wider transition-colors"
              >
                Torna al modulo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
