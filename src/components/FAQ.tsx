import { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-3">
            SEO & AEO OPTIMIZED
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans text-white tracking-tight">
            Domande Frequenti <span className="text-amber-500">.</span>
          </h2>
          <div className="h-1 w-12 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm">
            Tutto quello che c'è da sapere sulla nostra formula All You Can Eat, l'area bimbi e i servizi di asporto e consegna a domicilio a Foggia.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-hidden transition-all duration-300 hover:border-neutral-700/60"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="font-sans text-neutral-200 font-medium text-base sm:text-lg hover:text-white transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "transform rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96 border-t border-neutral-800/50" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-5 text-neutral-300 text-sm sm:text-base leading-relaxed bg-neutral-950/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
