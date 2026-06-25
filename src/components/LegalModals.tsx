import React from "react";
import { X, ShieldAlert, FileText, Cookie, Scale, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type LegalDocType = "privacy" | "cookie" | "terms" | "allergens" | "legal" | null;

interface LegalModalsProps {
  activeDoc: LegalDocType;
  onClose: () => void;
}

export default function LegalModals({ activeDoc, onClose }: LegalModalsProps) {
  if (!activeDoc) return null;

  const docTitle = {
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    terms: "Termini e Condizioni",
    allergens: "Presenza di Allergeni",
    legal: "Note Legali",
  }[activeDoc];

  const docIcon = {
    privacy: <FileText className="w-6 h-6 text-amber-500" />,
    cookie: <Cookie className="w-6 h-6 text-amber-500" />,
    terms: <Scale className="w-6 h-6 text-amber-500" />,
    allergens: <ShieldAlert className="w-6 h-6 text-red-500" />,
    legal: <Info className="w-6 h-6 text-amber-500" />,
  }[activeDoc];

  return (
    <AnimatePresence>
      <div 
        id="legal-modal-backdrop"
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "legal-modal-backdrop") {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-w-2xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50">
            <div className="flex items-center gap-3">
              {docIcon}
              <h2 className="text-xl font-sans font-semibold text-white tracking-wide">
                {docTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto scrollbar-thin text-neutral-300 font-sans text-sm space-y-6 leading-relaxed">
            {activeDoc === "privacy" && (
              <div className="space-y-4">
                <p>
                  Benvenuto su <strong>Xian Sushi Foggia</strong>. La tutela dei tuoi dati personali è per noi una priorità assoluta. Di seguito trovi le informazioni su come raccogliamo e trattiamo i tuoi dati.
                </p>

                <div className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800/40 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">1. Titolare del Trattamento</h4>
                  <p className="text-xs text-neutral-400">
                    Il titolare del trattamento dei dati è <strong>Xian Sushi Foggia S.r.l.</strong>, con sede legale a Foggia in Via Manfredonia 37. Per qualsiasi domanda puoi contattarci all'indirizzo email <span className="text-amber-500/90">info@xiansushifoggia.it</span> o al numero di telefono <span className="text-amber-500/90">377 8297346</span>.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Dati Raccolti e Finalità</h4>
                  <p>
                    I dati raccolti tramite i nostri form di contatto, prenotazione e acquisto d'asporto (come Nome, Cognome, Telefono, dettagli della prenotazione e dell'ordine) hanno l'unico scopo di consentire il corretto svolgimento del servizio richiesto.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-neutral-400 text-xs">
                    <li><strong>Modulo Prenotazione Tavoli:</strong> Raccolta del nome, numero di telefono, data, orario e numero ospiti. I dati vengono utilizzati per coordinare la prenotazione del tuo tavolo (con opzione di invio diretto su WhatsApp) e sincronizzati con la nostra lista contatti su Brevo (Lista 45) per finalità gestionali.</li>
                    <li><strong>Modulo Asporto & Domicilio:</strong> Raccolta dei prodotti selezionati, indirizzo di consegna, nome e numero di telefono per l'organizzazione logistica della consegna o del ritiro e sincronizzazione con Brevo per comunicazioni relative allo stato dell'ordine.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Conservazione e Sicurezza dei Dati</h4>
                  <p>
                    Tutti i dati personali vengono archiviati in modo sicuro e protetto. I contatti sincronizzati sulla piattaforma Brevo (Lista 45) sono protetti da rigorosi protocolli di sicurezza nel rispetto del GDPR (Regolamento UE 2016/679). Non vendiamo né cediamo a terzi in alcun modo le tue informazioni personali.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">I Tuoi Diritti</h4>
                  <p>
                    In quanto interessato, hai il diritto in qualunque momento di richiedere l'accesso ai tuoi dati, la rettifica, la cancellazione o la limitazione del trattamento. Ti basterà inviarci un'email o contattarci telefonicamente per l'immediata rimozione delle tue informazioni.
                  </p>
                </div>
              </div>
            )}

            {activeDoc === "cookie" && (
              <div className="space-y-4">
                <p>
                  Questo sito web utilizza i cookie per offrirti un'esperienza di navigazione fluida, sicura e personalizzata.
                </p>

                <div className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800/40 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">Cosa sono i cookie?</h4>
                  <p className="text-xs text-neutral-400">
                    I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Tipologie di Cookie Utilizzati</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-neutral-200 text-xs">Cookie Tecnici (Essenziali)</h5>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Questi cookie sono indispensabili per il corretto funzionamento del sito. Consentono di memorizzare i piatti che inserisci nel carrello per l'asporto, evitando che la tua selezione vada persa rinfrescando la pagina o navigando tra le sezioni.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-neutral-200 text-xs">Cookie di Preferenza</h5>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Utilizzati per memorizzare la tua scelta della pagina corrente o di elementi dell'interfaccia utente durante la sessione di navigazione.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Cookie di Profilazione e di Terze Parti</h4>
                  <p>
                    <strong>Non utilizziamo cookie di profilazione pubblicitaria</strong> proprietari. Il nostro sito è pulito e orientato solo all'ordinazione e alla prenotazione.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Come gestire o disabilitare i cookie</h4>
                  <p>
                    Puoi limitare, bloccare o eliminare i cookie modificando direttamente le impostazioni del tuo browser web (Chrome, Safari, Firefox, Edge, ecc.). Ti ricordiamo tuttavia che disattivando i cookie tecnici potrebbe risultare impossibile utilizzare il carrello per ordinare online o completare con successo le procedure del sito.
                  </p>
                </div>
              </div>
            )}

            {activeDoc === "terms" && (
              <div className="space-y-4">
                <p>
                  I presenti Termini e Condizioni disciplinano l'utilizzo del sito web di <strong>Xian Sushi Foggia</strong> e i servizi correlati di prenotazione tavoli e ordinazione online di asporto e consegna a domicilio.
                </p>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">1. Formula All You Can Eat (Consumo al Tavolo)</h4>
                  <p>
                    La nostra celebre formula All You Can Eat consente di ordinare ed assaporare liberamente e senza limiti tutte le proposte incluse nel menu di riferimento (Pranzo o Cena, feriale o festivo) a prezzo fisso.
                  </p>
                  <div className="p-4 bg-red-950/20 rounded-xl border border-red-900/30 text-xs text-neutral-300 space-y-1.5">
                    <span className="font-bold text-red-400 uppercase tracking-wider block">⚠️ REGOLA ANTISPRECO (NO WASTE)</span>
                    <p>
                      Tutti i piatti ordinati vengono preparati espressi sul momento dai nostri chef. Per rispetto delle materie prime e per evitare lo spreco di cibo, <strong>i piatti ordinati e non consumati interamente verranno addebitati a prezzo pieno di listino Take Away</strong>. Si invita ad ordinare con moderazione e gradualmente.
                    </p>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Le bevande, i liquori, il caffè ed i dessert sono sempre esclusi dal prezzo fisso della formula All You Can Eat, salvo dove espressamente indicato sul menu cartaceo.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">2. Prenotazione Tavoli</h4>
                  <p>
                    Il servizio di prenotazione online precompila un modulo digitale con i dettagli da te inseriti. Cliccando su "Invia Prenotazione su WhatsApp" verrai reindirizzato all'app di WhatsApp con il messaggio pronto per essere inviato al nostro numero. La prenotazione si ritiene confermata solo a seguito di un nostro messaggio di risposta positiva.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">3. Ordini Asporto & Consegna a Domicilio</h4>
                  <p>
                    I prezzi visualizzati nel carrello asporto del sito sono espressi in Euro (€) e comprensivi di IVA. L'invio dell'ordine genera un riepilogo dettagliato pronto per l'inoltro tramite WhatsApp. Il pagamento verrà concordato direttamente in chat ed eseguito alla consegna (contanti o POS) o al ritiro presso il ristorante.
                  </p>
                </div>
              </div>
            )}

            {activeDoc === "allergens" && (
              <div className="space-y-4">
                <div className="p-4 bg-red-950/25 rounded-xl border border-red-900/40 flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-white uppercase tracking-wider block">AVVISO IMPORTANTE PER LA SALUTE</span>
                    <p>
                      Se soffri di allergie o intolleranze alimentari, ti invitiamo a <strong>segnalarlo tempestivamente al personale di sala</strong> prima di ordinare o a specificarlo chiaramente nell'apposito campo "Note" durante la prenotazione o l'ordine asporto.
                    </p>
                  </div>
                </div>

                <p className="text-neutral-300">
                  In conformità con il <strong>Regolamento UE n. 1169/2011</strong>, informiamo la gentile clientela che i piatti preparati nel nostro locale possono contenere, come ingredienti o in tracce dovute a lavorazioni promiscue, le seguenti sostanze allergeniche:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { id: 1, name: "Glutine", desc: "Grano, segale, orzo, avena, farro (presente in tempura, salse di soia, impanature)" },
                    { id: 2, name: "Crostacei", desc: "Gamberi, mazzancolle, scampi, granchi, aragoste" },
                    { id: 3, name: "Uova", desc: "Uova fresche e prodotti derivati (presenti in maionese, alcune salse e dolci)" },
                    { id: 4, name: "Pesce", desc: "Tutte le specie di pesce (ingrediente base del nostro sushi crudo e cotto)" },
                    { id: 5, name: "Arachidi", desc: "Arachidi e derivati (oli, salse o guarnizioni di piatti fusion)" },
                    { id: 6, name: "Soia", desc: "Salsa di soia, edamame, tofu e condimenti contenenti soia" },
                    { id: 7, name: "Latte e Lattosio", desc: "Incluso formaggio spalmabile (cream cheese presente in molti uramaki)" },
                    { id: 8, name: "Frutta a guscio", desc: "Mandorle, pistacchi, nocciole (utilizzati come granella decorativa)" },
                    { id: 9, name: "Sedano", desc: "Sedano e prodotti derivati (presente in alcuni brodi o salse)" },
                    { id: 10, name: "Senape", desc: "Senape e prodotti derivati (presente in salse speciali)" },
                    { id: 11, name: "Semi di sesamo", desc: "Semi di sesamo interi o in olio (cosparsi su maki, uramaki e insalate)" },
                    { id: 12, name: "Anidride solforosa / Solfiti", desc: "Presenti in vini, aceto di riso e conserve" },
                    { id: 13, name: "Lupini", desc: "Lupini e prodotti a base di lupini" },
                    { id: 14, name: "Molluschi", desc: "Calamari, polpo, seppie, capesante, cozze" }
                  ].map((all) => (
                    <div key={all.id} className="p-3 bg-neutral-950/40 border border-neutral-800/60 rounded-xl space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 flex items-center justify-center bg-red-500/10 rounded-full text-red-500 font-bold text-[10px] font-mono">
                          {all.id}
                        </span>
                        <span className="font-semibold text-white text-xs">{all.name}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 pl-7 leading-relaxed">{all.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-neutral-400 mt-2">
                  La nostra cucina adotta rigorosi standard di pulizia e separazione, tuttavia la natura delle preparazioni espresse di sushi e piatti caldi non consente di escludere al 100% contaminazioni crociate accidentali.
                </p>
              </div>
            )}

            {activeDoc === "legal" && (
              <div className="space-y-4">
                <p>
                  Di seguito sono riportate le informazioni legali e societarie relative al sito web e all'attività di ristorazione.
                </p>

                <div className="p-5 bg-neutral-950/60 border border-neutral-800 rounded-xl space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider font-mono text-[10px]">Ragione Sociale</span>
                      <span className="text-white font-medium text-sm">Xian Sushi Foggia S.r.l.</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider font-mono text-[10px]">Sede Legale ed Operativa</span>
                      <span className="text-white font-medium">Via Manfredonia 37, 71121 Foggia (FG)</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider font-mono text-[10px]">Partita IVA / Codice Fiscale</span>
                      <span className="text-white font-mono font-medium">IT01234567890</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider font-mono text-[10px]">Capitale Sociale</span>
                      <span className="text-white font-medium">€10.000,00 i.v.</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider font-mono text-[10px]">Contatti Telefonici</span>
                      <span className="text-amber-500 font-medium">377 8297346</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider font-mono text-[10px]">Indirizzo Email Ufficiale</span>
                      <span className="text-amber-500 font-medium">info@xiansushifoggia.it</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Proprietà Intellettuale</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Tutti i contenuti presenti su questo sito (testi, marchi, elementi grafici, impaginazione, icone, logo del ristorante Xian Sushi Foggia, riepiloghi e foto dei piatti) sono di proprietà esclusiva di Xian Sushi Foggia S.r.l. o dei rispettivi concessori di licenza. Qualsiasi riproduzione, copia, distribuzione o utilizzo non espressamente autorizzato per iscritto costituisce violazione del diritto d'autore ed è perseguibile a norma delle leggi vigenti.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">Limitazione di Responsabilità</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Xian Sushi Foggia S.r.l. compie ogni ragionevole sforzo per mantenere aggiornate e prive di errori le informazioni contenute nel sito (inclusi prezzi del menu All You Can Eat, piatti asporto e orari di servizio). Tuttavia, non si assume responsabilità per eventuali inesattezze temporanee o ritardi di aggiornamento. I clienti sono invitati a fare sempre riferimento ai menu fisici presenti all'interno del locale per l'ordinazione finale.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer of Modal */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-950/40 text-center text-[11px] text-neutral-500 font-mono">
            XIAN SUSHI FOGGIA • VIA MANFREDONIA 37, FOGGIA
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
